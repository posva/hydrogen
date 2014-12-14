var save = null;
if(typeof(Storage) !== "undefined") {
  save = localStorage.getItem('savegame');
  if (save)
    save = $.parseJSON(save);
  else
    save = {};
} else {
  save = {};
}

function saveData() {
  localStorage.setItem($.stringify(save));
}
