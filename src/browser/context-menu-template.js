var reload = function(item, focusedWindow) {
  if (focusedWindow) {
    focusedWindow.webContents.reload();
  }
};

var comment = function(item, focusedWindow) {
  var selection = document.getSelection();
  if (selection.toString().length > 0) {
    var textbox = document.getElementById("post_textbox");
    textbox.value = "> " + selection;
    textbox.focus();
  }
};

var windows_linux_template = [
  {
    label: 'Undo',
    accelerator: 'CmdOrCtrl+Z',
    role: 'undo:'
  },
  {
    label: 'Redo',
    accelerator: 'Shift+CmdOrCtrl+Z',
    role: 'redo:'
  },
  {
    type: 'separator'
  },
  {
    label: 'Cut',
    accelerator: 'CmdOrCtrl+X',
    role: 'cut:'
  },
  {
    label: 'Copy',
    accelerator: 'CmdOrCtrl+C',
    role: 'copy:'
  },
  {
    label: 'Paste',
    accelerator: 'CmdOrCtrl+V',
    role: 'paste:'
  },
  {
    label: 'Select All',
    accelerator: 'CmdOrCtrl+A',
    role: 'selectAll:'
  },
  {
    type: 'separator'
  },
  {
    label: 'Reload',
    accelerator: 'CmdOrCtrl+R',
    click: reload
  },
  {
    type: 'separator'
  },
  {
    label: 'Comment',
    accelerator: 'Shift+CmdOrCtrl+C',
    click: comment
  }
];

var osx_template = [
  {
    label: 'Undo',
    accelerator: 'CmdOrCtrl+Z',
    selector: 'undo:'
  },
  {
    label: 'Redo',
    accelerator: 'Shift+CmdOrCtrl+Z',
    selector: 'redo:'
  },
  {
    type: 'separator'
  },
  {
    label: 'Cut',
    accelerator: 'CmdOrCtrl+X',
    selector: 'cut:'
  },
  {
    label: 'Copy',
    accelerator: 'CmdOrCtrl+C',
    selector: 'copy:'
  },
  {
    label: 'Paste',
    accelerator: 'CmdOrCtrl+V',
    selector: 'paste:'
  },
  {
    label: 'Select All',
    accelerator: 'CmdOrCtrl+A',
    selector: 'selectAll:'
  },
  {
    type: 'separator'
  },
  {
    label: 'Reload',
    accelerator: 'CmdOrCtrl+R',
    click: reload
  },
  {
    type: 'separator'
  },
  {
    label: 'Comment',
    accelerator: 'Shift+CmdOrCtrl+C',
    click: comment
  }
];

if (process.platform === 'darwin') {
  module.exports = osx_template
} else {
  module.exports = windows_linux_template;
}
