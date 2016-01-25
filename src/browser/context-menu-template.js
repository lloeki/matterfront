var remote = require('remote');

var template = [
  {
    label: 'Undo',
    accelerator: 'Command+Z',
    selector: 'undo:'
  },
  {
    label: 'Redo',
    accelerator: 'Shift+Command+Z',
    selector: 'redo:'
  },
  {
    type: 'separator'
  },
  {
    label: 'Cut',
    accelerator: 'Command+X',
    selector: 'cut:'
  },
  {
    label: 'Copy',
    accelerator: 'Command+C',
    selector: 'copy:'
  },
  {
    label: 'Paste',
    accelerator: 'Command+V',
    selector: 'paste:'
  },
  {
    label: 'Select All',
    accelerator: 'Command+A',
    selector: 'selectAll:'
  },
  {
    type: 'separator'
  },
  {
    label: 'Reload',
    accelerator: 'Command+R',
    click: function() { remote.getCurrentWindow().reload(); }
  }
];

module.exports = template;
