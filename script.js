const table = document.querySelector('.grid-cells')
const mainCells = [... document.querySelectorAll('.main-col, .main-row')]

const mainColParams = {
  num: 2,
  parent: mainCells[0]
}

const mainRowParams = {
  num: 1,
  parent: mainCells[1]
}

const tableParams = {
  num: 2,
  multiplier: 2,
  parent: table
}

function createMainCells({num, parent}) {
  while (num <= 10) {
    parent.insertAdjacentHTML('beforeend', `<div class="col-${num}">${num++}</div>`)
  }

  return parent
}

function createTableRow({num, multiplier, parent}) {
  while (multiplier <= 10) {
    parent.insertAdjacentHTML('beforeend', `<div class="col-${multiplier}">${num * multiplier++}</div>`)
  }
}

function createTableCells({num, multiplier, parent}) {
  while (num <= 10) {
    createTableRow({num, multiplier, parent})
    num++
  }
  
  return parent
}

const mainCol = [... createMainCells(mainColParams).querySelectorAll('div')]
const mainRow = [... createMainCells(mainRowParams).querySelectorAll('div')]
const tableCells = [... createTableCells(tableParams).querySelectorAll('div')]

function handleMouseover(cell) {
  cell.addEventListener('mouseover', () => {
    mainRow.some(mainRowCell => {
      handleMouseleave(mainRowCell)
      
      if (mainRowCell.classList.contains(cell.classList)) {
        mainRowCell.classList.add('on-hover')

        mainCol.some(mainColCell => {
          handleMouseleave(mainColCell)
          mainColCell.classList.contains(`col-${+cell.textContent / +mainRowCell.textContent}`) && mainColCell.classList.add('on-hover')
        })
      }
    })
  })
}

function handleMouseleave(cell) {
  cell.classList.remove('on-hover')
}

tableCells.forEach(handleMouseover)

table.addEventListener('mouseleave', () => {
  mainRow.forEach(handleMouseleave)
  mainCol.forEach(handleMouseleave)
})
