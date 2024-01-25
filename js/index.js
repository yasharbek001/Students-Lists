const elTable = document.querySelector("table")
const elThead = document.querySelector("thead")
const elTbody = document.querySelector("tbody")
const thtemplate = document.querySelector(".thTemplate").content
const elTemplate = document.querySelector(".template").content

function renderth(thData) {
  
  thData.forEach(obj => {

    const values = Object.values(obj)
    
    const elTr = document.createElement("tr")

    values.forEach(i => {
     
      let elTh = document.createElement("th")
      elTh.textContent = i
      elTr.appendChild(elTh)
    });

    elThead.appendChild(elTr)
  })
}
renderth(headDatas)

function render(item) {
  elTbody.innerHTML = ""
  const frag = document.createDocumentFragment()

  item.forEach(trData => {
    const cloneTr = elTemplate.cloneNode(true)
    cloneTr.querySelector(".id").textContent = trData.id
    cloneTr.querySelector(".fullName").textContent = trData.name +" "+" "+ trData.lastName
    cloneTr.querySelector(".markedDate").textContent = trData.markedDate
    cloneTr.querySelector(".mark").textContent = trData.mark
    cloneTr.querySelector(".status").textContent = trData.mark < 50 ? "Fail" : "Pass"
    cloneTr.querySelector(".status").style.color = trData.mark < 50 ? "red" : "green"
    cloneTr.querySelector(".edit").id = trData.id
    cloneTr.querySelector(".delete").id = trData.id
    
    frag.appendChild(cloneTr)
    
  })
  elTbody.appendChild(frag)
  
}
render(students)


//Modal
const elModal = document.querySelector(".exam-results__add")
const elModalOpen = document.querySelector(".exam-results__adder")
const elModalToclose = document.querySelector(".exam-results__add-toClose")
const elForm = document.querySelector(".exam-results__add-form")


function toCloseModal() {
  elModal.classList.remove("modal--open")
}

elModalOpen.addEventListener("click", function() {
  elModal.classList.add("modal--open")
})

elModalToclose.addEventListener("click", toCloseModal)

elForm.addEventListener("submit", toCloseModal)

elModal.addEventListener("click", function(event) {
  if (!event.target.closest(".exam-results__add-wrapper")) {
  toCloseModal()
  }
})

// ADD
const elFormName = document.querySelector(".form-name")
const elFormLastname = document.querySelector(".form-lastName")
const elFormMark = document.querySelector(".form-mark")

elForm.addEventListener("submit", function(event) {
  event.preventDefault()

  students.push({
    id: Date.now(),
    name: elFormName.value,
    lastName: elFormLastname.value,
    mark: elFormMark.value,
    markedDate: new Date().toISOString(),
  })
  elTbody.innerHTML = ""
  render(students)
})

//Edit
const elInputName = document.querySelector(".input-name")
const elInputLastname = document.querySelector(".input-lastName")
const elInputMark = document.querySelector(".input-mark")

elTbody.addEventListener("click", (even => {
  if (even.target.closest(".delete")) {

    const deleteEl = (even.target.closest(".delete"))
    const  idNumber = Number(deleteEl.id)

    const newFilterDlt = students.filter(el => {
         
      return el.id !== idNumber
    })
    elTbody.innerHTML = ""
    render(newFilterDlt)
    students = newFilterDlt
  }
  
  if ( even.target.closest(".edit")) {
    const edit = even.target.closest(".edit")

    const newEdit = students.filter(fItem => {
      
      return fItem.id == edit.id
    })

    const name = newEdit[0].name
    const lastName = newEdit[0].lastName
    const mark  = newEdit[0].mark
    

    elInputName.setAttribute("value", name)
    elInputLastname.setAttribute("value", lastName)
    elInputMark.setAttribute("value", mark)
    

    const elModalEdit = document.querySelector(".exam-results__edit")
    const elModalTocloseEdit = document.querySelector(".exam-results__edit-toClose")
    const elFormEdit = document.querySelector(".exam-results__edit-form")

    function toCloseModalEdit() {
      elModalEdit.classList.remove("modal--edit")
    }

    elModalEdit.classList.add("modal--edit")

    elModalTocloseEdit.addEventListener("click", toCloseModalEdit)

    elFormEdit.addEventListener("submit", toCloseModalEdit)

    elModalEdit.addEventListener("click", function(event) {
      if (!event.target.closest(".exam-results__edit-wrapper")) {
      toCloseModalEdit()
      }
    })

    elFormEdit.addEventListener("submit", (evForm => {
      evForm.preventDefault()

      const userIndex = students.findIndex(ElItem => {
        console.log(ElItem.id == edit.id)
        return ElItem.id == edit.id
      })

      const editidUserData = {
        ...students[userIndex], 
        name: elInputName.value,
        lastName: elInputLastname.value,
        mark: elInputMark.value,
      }

      students[userIndex] = editidUserData

      render(students)

      students.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLocaleLowerCase()))

    }))
  }
}))

//Search
const elSearchForm = document.querySelector(".exam-results__form")
const elSearchName = document.querySelector(".exam-results__form-input-width")
const elSearchFrom = document.querySelector(".from")
const elSearchTo = document.querySelector(".to")

elSearchForm.addEventListener("submit", (evenS => {
  evenS.preventDefault()

  const from = Number(elSearchFrom.value) || 0
  const to = Number(elSearchTo.value) || 150

  const newStudent = students.filter(userN => {
    return (userN.name.toLocaleLowerCase().startsWith(elSearchName.value.toLocaleLowerCase()) || userN.lastName.startsWith(elSearchName.value)) && (userN.mark >= from && userN.mark <= to)
  })
  console.log(newStudent)
  console.log(from)
  console.log(to)

  const elSelect = document.querySelector(".exam-results__select-option")
  const elValue = elSelect.value
  
  
  if (elValue == "a-z") {
    
    newStudent.sort((a, b) =>  a.name.toLowerCase().localeCompare(b.name.toLowerCase()))

  } else if(elValue == "z-a") {
    
    
  
    newStudent.sort((a, b) => b.name.toLowerCase().localeCompare(a.name.toLowerCase()))
 
  } 
  
  render(newStudent)

}))



