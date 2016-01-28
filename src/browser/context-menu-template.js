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

var changeTemplateForOSx = function(obj){
  //OSx uses the 'selector' key whereas Windows/Linux uses 'role'
  for (var i=0; i < obj.length; i++) {
    if (obj[i].role) {
      obj[i].selector = obj[i].role;
      delete obj[i].role;
    }
  }
  return obj;
};

var template = [
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

if (process.platform === 'darwin') {
  template = changeTemplateForOSx(template);
}

module.exports = template
