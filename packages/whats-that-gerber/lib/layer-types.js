'use strict'

var c = require('./constants')

module.exports = [
  // high-priority blacklist
  {
    type: null,
    side: null,
    matchers: [
      // eagle gerber generation metadata
      {
        ext: 'gpi',
        cad: [
          c._CAD_EAGLE,
          c._CAD_EAGLE_LEGACY,
          c._CAD_EAGLE_OSHPARK,
          c._CAD_EAGLE_PCBNG,
        ],
      },
      // eagle drill generation metadata
      {
        ext: 'dri',
        cad: [
          c._CAD_EAGLE,
          c._CAD_EAGLE_LEGACY,
          c._CAD_EAGLE_OSHPARK,
          c._CAD_EAGLE_PCBNG,
        ],
      },
      // general data/BOM files
      {ext: 'csv', cad: null},
      // pick-n-place BOMs
      {match: /pnp_bom/, cad: c._CAD_EAGLE_PCBNG},
      {match: /report/, cad: c._CAD_EAGLE_PCBNG},
      {match: /FliDRL.lst/, cad: null},
      {match: /FliDRL.rep/, cad: null},
      {match: /gluebottom.gbr/, cad: null},
      {match: /gluetop.gbr/, cad: null},
     
    ],
  },
  {
    type: c.TYPE_COPPER,
    side: c.SIDE_INNER,
    matchers: [
      {ext: 'ly\\d+', cad: c._CAD_EAGLE_LEGACY},
      {ext: 'gp?\\d+', cad: [c._CAD_KICAD, c._CAD_ALTIUM]},
      {ext: 'in\\d+', cad: c._CAD_ORCAD},
      {ext: 'internalplane\\d+\\.ger', cad: c._CAD_EAGLE_OSHPARK},
      {match: /in(?:ner)?\d+[._]cu/, cad: c._CAD_KICAD},
      {match: /inner/, cad: c._CAD_DIPTRACE},
      {match: /innerbottom.gbr/, cad: null},
      {match: /innertop.gbr/, cad: null},
      {match: /Flignd/, cad: null},
      {match: /Flivcc/, cad: null},
    ],
  },
  {
    type: c.TYPE_SOLDERMASK,
    side: c.SIDE_TOP,
    matchers: [
      {ext: 'stc', cad: c._CAD_EAGLE_LEGACY},
      {ext: 'tsm', cad: c._CAD_EAGLE_LEGACY},
      {ext: 'gts', cad: [c._CAD_KICAD, c._CAD_ALTIUM]},
      {ext: 'smt', cad: c._CAD_ORCAD},
      {ext: 'topsoldermask\\.ger', cad: c._CAD_EAGLE_OSHPARK},
      {match: /topmask\.\w+$/, cad: [c._CAD_GEDA_PCB, c._CAD_DIPTRACE]},
      {match: /f[._]mask/, cad: c._CAD_KICAD},
      {match: /soldermask_top/, cad: c._CAD_EAGLE},
      {match: /top_mask/, cad: c._CAD_EAGLE_PCBNG},
      {match: /top solder resist/, cad: null},
      {match: /mt./, cad: null},
      {match: /masktop.gbr/, cad: null},
      {match: /FliTSM/, cad: null},
      {match: /MaskTop/, cad: null},
    ],
  },
  {
    type: c.TYPE_SILKSCREEN,
    side: c.SIDE_TOP,
    matchers: [
      {ext: 'plc', cad: c._CAD_EAGLE_LEGACY},
      {ext: 'tsk', cad: c._CAD_EAGLE_LEGACY},
      {ext: 'gto', cad: [c._CAD_KICAD, c._CAD_ALTIUM]},
      {ext: 'sst', cad: c._CAD_ORCAD},
      {ext: 'topsilkscreen\\.ger', cad: c._CAD_EAGLE_OSHPARK},
      {match: /topsilk\.\w+$/, cad: [c._CAD_GEDA_PCB, c._CAD_DIPTRACE]},
      {match: /f[._]silks/, cad: c._CAD_KICAD},
      {match: /silkscreen_top/, cad: c._CAD_EAGLE},
      {match: /top_silk/, cad: c._CAD_EAGLE_PCBNG},
      {match: /top silk screen/, cad: null},
      {match: /FliTSS/, cad: null},
      {match: /SilkTop.gbr/, cad: null},
    ],
  },
  {
    type: c.TYPE_SOLDERPASTE,
    side: c.SIDE_TOP,
    matchers: [
      {ext: 'crc', cad: c._CAD_EAGLE_LEGACY},
      {ext: 'tsp', cad: c._CAD_EAGLE_LEGACY},
      {ext: 'gtp', cad: [c._CAD_KICAD, c._CAD_ALTIUM]},
      {ext: 'spt', cad: c._CAD_ORCAD},
      {ext: 'tcream\\.ger', cad: c._CAD_EAGLE_OSHPARK},
      {match: /toppaste\.\w+$/, cad: [c._CAD_GEDA_PCB, c._CAD_DIPTRACE]},
      {match: /f[._]paste/, cad: c._CAD_KICAD},
      {match: /solderpaste_top/, cad: c._CAD_EAGLE},
      {match: /top_paste/, cad: c._CAD_EAGLE_PCBNG},
      {match: '/pt./', cad: null},
      {match: /pastetop.gbr/, cad: null},
      {match: /FliTSP/, cad: null},
      {match: /PasteTop/, cad: null},
    ],
  },
  {
    type: c.TYPE_SOLDERMASK,
    side: c.SIDE_BOTTOM,
    matchers: [
      {ext: 'sts', cad: c._CAD_EAGLE_LEGACY},
      {ext: 'bsm', cad: c._CAD_EAGLE_LEGACY},
      {ext: 'gbs', cad: [c._CAD_KICAD, c._CAD_ALTIUM]},
      {ext: 'smb', cad: c._CAD_ORCAD},
      {ext: 'bottomsoldermask\\.ger', cad: c._CAD_EAGLE_OSHPARK},
      {match: /bottommask\.\w+$/, cad: [c._CAD_GEDA_PCB, c._CAD_DIPTRACE]},
      {match: /b[._]mask/, cad: c._CAD_KICAD},
      {match: /soldermask_bottom/, cad: c._CAD_EAGLE},
      {match: /bottom_mask/, cad: c._CAD_EAGLE_PCBNG},
      {match: /bottom solder resist/, cad: null},
      {match: /mb./, cad: null},
      {match: /maskbottom.gbr/, cad: null},
      {match: /FliBSM/, cad: null},
      {match: /MaskBottom/, cad: null},
    ],
  },
  {
    type: c.TYPE_SILKSCREEN,
    side: c.SIDE_BOTTOM,
    matchers: [
      {ext: 'pls', cad: c._CAD_EAGLE_LEGACY},
      {ext: 'bsk', cad: c._CAD_EAGLE_LEGACY},
      {ext: 'gbo', cad: [c._CAD_KICAD, c._CAD_ALTIUM]},
      {ext: 'ssb', cad: c._CAD_ORCAD},
      {ext: 'bottomsilkscreen\\.ger', cad: c._CAD_EAGLE_OSHPARK},
      {match: /bottomsilk\.\w+$/, cad: [c._CAD_GEDA_PCB, c._CAD_DIPTRACE]},
      {match: /b[._]silks/, cad: c._CAD_KICAD},
      {match: /silkscreen_bottom/, cad: c._CAD_EAGLE},
      {match: /bottom_silk/, cad: c._CAD_EAGLE_PCBNG},
      {match: /bottom silk screen/, cad: null},
      {match: /FliBSS/, cad: null},
    ],
  },
  {
    type: c.TYPE_SOLDERPASTE,
    side: c.SIDE_BOTTOM,
    matchers: [
      {ext: 'crs', cad: c._CAD_EAGLE_LEGACY},
      {ext: 'bsp', cad: c._CAD_EAGLE_LEGACY},
      {ext: 'gbp', cad: [c._CAD_KICAD, c._CAD_ALTIUM]},
      {ext: 'spb', cad: c._CAD_ORCAD},
      {ext: 'bcream\\.ger', cad: c._CAD_EAGLE_OSHPARK},
      {match: /bottompaste\.\w+$/, cad: [c._CAD_GEDA_PCB, c._CAD_DIPTRACE]},
      {match: /b[._]paste/, cad: c._CAD_KICAD},
      {match: /solderpaste_bottom/, cad: c._CAD_EAGLE},
      {match: /bottom_paste/, cad: c._CAD_EAGLE_PCBNG},
      {match: /pb./, cad: null},
      {match: /pastebottom.gbr/, cad: null},
      {match: /FliBSP/, cad: null},
    ],
  },
  {
    type: c.TYPE_OUTLINE,
    side: c.SIDE_ALL,
    matchers: [
      {ext: 'dim', cad: c._CAD_EAGLE_LEGACY},
      {ext: 'mil', cad: c._CAD_EAGLE_LEGACY},
      {ext: 'gml', cad: c._CAD_EAGLE_LEGACY},
      {ext: 'gm1', cad: [c._CAD_KICAD, c._CAD_ALTIUM], att: c.OUTLINE_B},
      {ext: 'gm13', cad: [c._CAD_KICAD, c._CAD_ALTIUM], att: c.OUTLINE_E},
      {ext: 'gm14', cad: [c._CAD_KICAD, c._CAD_ALTIUM], att: c.OUTLINE_F},
      {ext: 'gm2', cad: [c._CAD_KICAD, c._CAD_ALTIUM], att: c.OUTLINE_C},
      {ext: 'gm3', cad: [c._CAD_KICAD, c._CAD_ALTIUM], att: c.OUTLINE_D},
      {ext: 'gko', cad: c._CAD_ALTIUM, att: c.OUTLINE_A},
      {ext: 'fab', cad: c._CAD_ORCAD},
      {match: /outline/, cad: [c._CAD_GEDA_PCB, c._CAD_EAGLE_PCBNG], att:c.OUTLINE_A},
      {match: /boardoutline/, cad: [c._CAD_EAGLE_OSHPARK, c._CAD_DIPTRACE]},
      {match: /edge[._]cuts/, cad: c._CAD_KICAD},
      {match: /profile/, cad: c._CAD_EAGLE},
      {match: /mechanical \d+/, cad: null},
      {match: /ko./, cad: null},
      {match: /vcut.gbr/, cad: null},
      {match: /Flidrill/, cad: null},
    ],
  },
  {
    type: c.TYPE_DRILL,
    side: c.SIDE_ALL,
    matchers: [
      {ext: 'txt', cad: c.ATT_OUTLINE_A},
      {
        ext: 'xln',
        cad: [c._CAD_EAGLE, c._CAD_EAGLE_LEGACY, c._CAD_EAGLE_OSHPARK],
      },
      {ext: 'exc', cad: c._CAD_EAGLE_LEGACY},
      {ext: 'drd', cad: c._CAD_EAGLE_LEGACY},
      {match: /npth.drl/, cad: c._CAD_KICAD,att:c.DRILL_NPTH},
      {ext: 'drl', cad: [c._CAD_KICAD, c._CAD_DIPTRACE],att:c.DRILL_PTH},
      {ext: 'tap', cad: c._CAD_ORCAD},
      {ext: 'npt', cad: c._CAD_ORCAD},
      {ext: 'plated-drill\\.cnc', cad: c._CAD_GEDA_PCB},
      {match: /fab/, cad: c._CAD_GEDA_PCB},
      {match: '/drill/', cad: c._CAD_EAGLE_PCBNG,att:c.DRILL_PTH},
      {match: /pl./, cad: c._CAD_EAGLE_PCBNG,att:c.DRILL_PTH},
      {match: /FliDRL/, cad: null,att:c.DRILL_PTH},
    ],
  },
  {
    type: c.TYPE_DRAWING,
    side: null,
    matchers: [
      {ext: 'pos', cad: c._CAD_KICAD},
      {ext: 'art', cad: c._CAD_ALLEGRO},
      {match: /gluebottom.gbr/, cad: null},
      {match: /gluetop.gbr/, cad: null},
    ],
  },
  {
    type: c.TYPE_COPPER,
    side: c.SIDE_TOP,
    matchers: [
      {ext: 'cmp', cad: c._CAD_EAGLE_LEGACY},
      {ext: 'top', cad: [c._CAD_EAGLE_LEGACY, c._CAD_ORCAD]},
      {ext: 'gtl', cad: [c._CAD_KICAD, c._CAD_ALTIUM]},
      {ext: 'toplayer\\.ger', cad: c._CAD_EAGLE_OSHPARK},
      // {match: /top.\w+$/, cad: [c._CAD_GEDA_PCB, c._CAD_DIPTRACE]},
      {match: /f[._]cu/, cad: c._CAD_KICAD},
      {match: /copper_top/, cad: c._CAD_EAGLE},
      {match: /top_copper/, cad: c._CAD_EAGLE_PCBNG},
      {match: /top copper/, cad: null},
      {match: /lt./, cad: null},
      {match: /Flicomp/, cad: null},
      {match: /top/, cad: null},
    ],
  },
  {
    type: c.TYPE_COPPER,
    side: c.SIDE_BOTTOM,
    matchers: [
      {ext: 'sol', cad: c._CAD_EAGLE_LEGACY},
      {ext: 'bot', cad: [c._CAD_EAGLE_LEGACY, c._CAD_ORCAD]},
      {ext: 'gbl', cad: [c._CAD_KICAD, c._CAD_ALTIUM]},
      {ext: 'bottomlayer\\.ger', cad: c._CAD_EAGLE_OSHPARK},
      // {match: /bottom\.\w+$/, cad: [c._CAD_GEDA_PCB, c._CAD_DIPTRACE]},
      {match: /b[._]cu/, cad: c._CAD_KICAD},
      {match: /copper_bottom/, cad: c._CAD_EAGLE},
      {match: /bottom_copper/, cad: c._CAD_EAGLE_PCBNG},
      {match: /bottom copper/, cad: null},
      {match: /lb./, cad: null},
      {match: /Flisold/, cad: null},
      {match: /bottom/, cad: [c._CAD_GEDA_PCB, c._CAD_DIPTRACE]},
    ],
  },
]
