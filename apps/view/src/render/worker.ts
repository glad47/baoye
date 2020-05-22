import {
  createBoardDatabase,
  saveBoard,
  getBoard,
  getBoards,
  findBoardByUrl,
  deleteBoard,
  deleteAllBoards,
  BoardDatabase,
} from '../db'

import {RenderWorkerContext, WorkerMessageEvent} from './types'

import {
  filesToStackups,
  urlToStackups,
  stackupToBoard,
  stackupToBoardRender,
  boardToStackups,
  stackupToZipBlob,
  updateBoard,
  updateBoardThumbnail,
  stackupToZip,
  gerberInfoGet,
} from './models'

import {
  Action,
  CREATE_BOARD,
  CREATE_BOARD_FROM_URL,
  GET_BOARD,
  GET_BOARD_PACKAGE,
  UPDATE_BOARD,
  DELETE_BOARD,
  DELETE_ALL_BOARDS,
  boardRendered,
  boardUpdated,
  boardDeleted,
  boardPackaged,
  allBoardsDeleted,
  workerInitialized,
  workerErrored,
  parsingGerber,
  PARSING_GERBER,
} from '../state'
import { ajaxFileUpload } from '../SpecificationInput/AjaxService'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ctx: RenderWorkerContext = self as any
let db: BoardDatabase

createBoardDatabase()
  .then(database => {
    db = database
    return getBoards(db)
  })
  .then(boards => ctx.postMessage(workerInitialized(boards)))

const duration = (start: number): number => Date.now() - start

ctx.onmessage = function receive(event) {
  const request = event.data
  const startTime = Date.now()
  let response

  switch (request.type) {
    case CREATE_BOARD_FROM_URL: {
      const url = request.payload

      response = Promise.all([
        findBoardByUrl(db, url),
        urlToStackups(url),
      ]).then(async result => {
        // @ts-ignore: https://github.com/microsoft/TypeScript/issues/33752
        const [existingBoard, [selfContained, shared]] = result
        let board = stackupToBoard(selfContained)
        let saveQuery

        board.sourceUrl = url

        if (!existingBoard) {
          const render = stackupToBoardRender(shared, board)

          ctx.postMessage(boardRendered(render, duration(startTime)))
          saveQuery = saveBoard(db, board)
        } else {
          board = updateBoard(board, existingBoard)
          saveQuery = boardToStackups(board).then(stackups => {
            const [selfContained, shared] = stackups
            const render = stackupToBoardRender(shared, board)

            board = updateBoardThumbnail(board, selfContained)
            ctx.postMessage(boardRendered(render, duration(startTime)))

            return saveBoard(db, board)
          })
        }

        return saveQuery.then(() => ctx.postMessage(boardUpdated(board)))
      })

      break
    }

    case CREATE_BOARD: {
      const files = request.payload
      //console.log(files);
      response = filesToStackups(files).then(async stackups => {
        const [selfContained, shared] = stackups
        let gerberInfo = gerberInfoGet(shared);
        ajaxFileUpload(files).then((rep)=>{
          const { data:{data,code}} =rep;
          if(code === 0){
            gerberInfo.quoteFilePath = data;
          }
          ctx.postMessage(parsingGerber(gerberInfo))
        });

        // console.log("1hao",selfContained);
        // console.log("2hao",shared);
        const board = stackupToBoard(selfContained)
        const render = stackupToBoardRender(shared, board)
        // console.log("board",board)
        // console.log("render",render)
        // console.log("fffffffffffffffffffffffff",files)
        ctx.postMessage(boardRendered(render, duration(startTime)))
        ctx.postMessage(boardUpdated(board))
        

        // return saveBoard(db, board).then(() =>{
        //   ctx.postMessage(boardUpdated(board))
        //   //! 解析上传的资料
        //   ctx.postMessage(parsingGerber(gerberInfo))
        // })
      })

      break 
    }

    case GET_BOARD: {
      const id = request.payload

      response = getBoard(db, id).then(async board =>
        boardToStackups(board).then(stackups => {
          const [, shared] = stackups
          const render = stackupToBoardRender(shared, board)
          ctx.postMessage(boardRendered(render, duration(startTime)))
        })
      )

      break
    }

    case GET_BOARD_PACKAGE: {
      const id = request.payload

      response = getBoard(db, id).then(async board =>
        boardToStackups(board)
          .then(stackups => {
            const [selfContained] = stackups
            return stackupToZipBlob(selfContained)
          })
          .then(blob => ctx.postMessage(boardPackaged(id, board.name, blob)))
      )

      break
    }

    case UPDATE_BOARD: {
      const {id, update} = request.payload

      response = getBoard(db, id).then(async prevBoard => {
        const board = updateBoard(prevBoard, update)

        return boardToStackups(board).then(async stackups => {
          const [selfContained, shared] = stackups
          const render = stackupToBoardRender(shared, board)
          const nextBoard = updateBoardThumbnail(board, selfContained)

          ctx.postMessage(boardRendered(render, duration(startTime)))

          return saveBoard(db, nextBoard).then(() =>
            ctx.postMessage(
              boardUpdated({
                id: nextBoard.id,
                name: nextBoard.name,
                options: nextBoard.options,
                thumbnail: nextBoard.thumbnail,
              })
            )
          )
        })
      })
      break
    }

    case DELETE_BOARD: {
      const id = request.payload

      response = deleteBoard(db, id).then(() =>
        ctx.postMessage(boardDeleted(id))
      )
      break
    }

    case DELETE_ALL_BOARDS: {
      response = deleteAllBoards(db).then(() =>
        ctx.postMessage(allBoardsDeleted())
      )
      break
    }
  }

  if (response) {
    response.catch((e: Error) => ctx.postMessage(workerErrored(request, e)))
  }
}

declare module './worker' {
  /** 渲染worker */
  export default class RenderWorker extends Worker {
    constructor()
    /** 主线程通过worker.onmessage指定监听函数，接收子线程发回来的消息。*/
    onmessage: (event: WorkerMessageEvent) => void
    /** postMessage()方法，向 Worker 发消息。 */
    postMessage(message: Action): void
  }
}
