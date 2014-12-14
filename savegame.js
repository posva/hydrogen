var save = null;
if(typeof(Storage) !== "undefined") {
  save = localStorage.getItem('savegame');
  if (save)
    try {
      save = $.parseJSON(save);
    } catch (e) {
      save = {};
    }
  else
    save = {};
} else {
  save = {};
}

function saveData() {
  localStorage.setItem('savegame', JSON.stringify(save));
}
