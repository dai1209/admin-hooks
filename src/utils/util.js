
export function title(title) {
    window.document.title = title;
};

export function findTreeNode(tree,name,id) {
  let res ;
  function fn(tree,name,id) {
    for (const item of tree) {
      if (item[name] == id) {
        res = item
        break
      }
      if (item.children && item.children.length > 0){
        fn(item.children,name,id)
      }
    }
  }
  fn(tree,name,id)
  return res
  
}

export function findSelectNode(data,id) {
  const res = []
  let flag = false
  const findId = (data) => data.find(item => {
    if(item.id === id ){
      flag = true
      res.splice(0)
      res.push(item.id) 
      return true
    }
    if(item.children.length > 0){
      findId(item.children)
      res.push(item.id)
      return flag
    }
    
    return false
  })
  findId(data)

  return res.reverse()
}

export function getMenuByName(name, menulist) {
    let menu = {};
    let forFn = function (name, menulist) {
        for (var item of menulist) {
            if (item.name === name) {
                menu = item;
            } else {
                if (item.children && item.children.length > 0) {
                    forFn(name, item.children)
                }
            }
            if (menu.name) {
                break;
            }
        }
    }
    forFn(name, menulist);
    return menu;
}

export function getTreeEleByPropertyValue(value, property, list) {
    let ele = {};
    let forFn = function (value, property, list) {
        for (var item of list) {
            if (item[property] === value) {
                ele = item;
            } else {
                if (item.children && item.children.length > 0) {
                    forFn(value, property, item.children)
                }
            }
            if (ele[property]) {
                break;
            }
        }
    }
    forFn(value, property, list);
    return ele;
}

export function oneOf(ele, targetArr) {
    if (targetArr.indexOf(ele) >= 0) {
        return true;
    } else {
        return false;
    }
};
export function getParentMenusByName(openAccesseMenu, name) {
    let temp = [];
    let forFn = function (openAccesseMenu, name) {
        for (var item of openAccesseMenu) {
            if (item.name === name && item.path !== "/") {
                temp.push(item);
                forFn(openAccesseMenu, item.parentName);
            }
        }
    };
    forFn(openAccesseMenu, name);
    temp.reverse()
    return temp;
};

export function getTreeEleWithParent(id, list) {
    let temp = [];
    let forFn = function (id, list) {
        for (var item of list) {
            if (item.id === id) {
                let newItem = { ...item }
                temp.push(newItem);
                forFn(item.parentId, list);
            }
        }
    };
    forFn(id, list);
    temp.reverse()
    return temp;
};

export function handleTitle(vm, item) {
    return item.title;
};


export function openAccesseMenu(accesseMenu) {
    let openAccesseMenu = [];
    let forFn = function (menulist, parentName) {
        for (var item of menulist) {
            item.parentName = parentName;
            openAccesseMenu.push(item)
            if (item.children && item.children.length > 0) {
                forFn(item.children, item.name)
            }
        }
    }
    forFn(accesseMenu, '');
    return openAccesseMenu;
}

export function openTreeData(data) {
    let openAccesseMenu = [];
    let forFn = function (data) {
        for (var item of data) {
            openAccesseMenu.push({ ...item })
            if (item.children && item.children.length > 0) {
                forFn(item.children)
            }
        }
    }
    forFn(data);
    return openAccesseMenu;
}


export function formatDateTime(inputTime) {
    var date = new Date(inputTime);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
};
