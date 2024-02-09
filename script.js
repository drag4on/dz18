const tasksList = document.querySelector('.tasks-list')
const addTaskForm = document.querySelector('.add-task-form')


const displayTasks = async () => {
  const response = await fetch('http://localhost:3000/tasks')
  const tasks = await response.json()

  tasksList.innerHTML = ''
  
  tasks.forEach(task => {
    
    const li = document.createElement('li')
    const title = document.createElement('h3')
    const description = document.createElement('p')
    const deleteButton = document.createElement('button')

    title.textContent = task.title
    description.textContent = task.description
    deleteButton.textContent = 'Удалить'
  
    deleteButton.addEventListener('click', async () => {
      await fetch(`http://localhost:3000/tasks/${task.id}`, {
        method: 'DELETE'
      })

    })
    

    li.appendChild(title)
    li.appendChild(description)
    li.appendChild(deleteButton)

    tasksList.appendChild(li)

    const ul = document.querySelector('li')
    li.addEventListener('click', async (e) => {
        ul.style.border = "solid lime"
        
    })
    })
}


addTaskForm.addEventListener('submit', async (e) => {
  e.preventDefault()

  const titleInput = document.querySelector('.task-title-input')
  const descriptionInput = document.querySelector('.task-description-input')

  await fetch('http://localhost:3000/tasks', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      id: titleInput.value,
      title: titleInput.value,
      description: descriptionInput.value
    })
  })

  titleInput.value = ''
  descriptionInput.value = ''

  displayTasks()
})


displayTasks()  