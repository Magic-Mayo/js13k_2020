const btn = document.body.querySelector('.toggle-game')

btn.addEventListener('click', e => {
    e.preventDefault();

    document.body.querySelector('.container').classList.remove('invisible')
    btn.classList.add('invisible')
    
})