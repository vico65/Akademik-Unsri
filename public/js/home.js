let buttonListSidebar = document.getElementById('button_list_sidebar')
let sidebar = document.getElementById('sidebar')
let iconListSidebar = document.getElementById('icon_list_sidebar')
let container_halaman = document.getElementById('container_halaman')
let loader = document.getElementById('loader')
let listAkademikPages = document.querySelector('.list_akademik_pages')
let toggleDarkMode = document.querySelector('.toggle-dark-mode')
let toggleDarkModeChild = document.querySelector('.toggle-dark-mode div')
let htmlTag = document.querySelector('html')
let iconTerang = document.querySelector('.icon-terang')
let iconGelap = document.querySelector('.icon-gelap')

let pointers = [
    document.getElementById('pointer_home'),
    document.getElementById('pointer_bio'),
    document.getElementById('pointer_akademik'),
    document.getElementById('pointer_suliet'),
    document.getElementById('pointer_kkn'),
    document.getElementById('pointer_password'),
    document.getElementById('pointer_krs'),
    document.getElementById('pointer_khs'),
    document.getElementById('pointer_tn'),

]

let activePointer = null

let halaman_depan = 'container\\container_home.html'
let halaman_data_pribadi = 'container\\container_data_pribadi.html'
let halaman_data_akademik = 'container\\container_data_akademik.html'
let halaman_suliet = 'container\\container_suliet.html'
let halaman_kkn = 'container\\container_kkn.html'
let halaman_setting_password = 'container\\container_setting_password.html'
let halaman_krs = 'container\\container_krs.html'
let halaman_khs = 'container\\container_khs.html'
let halaman_tn = 'container\\container_tn.html'

let pages = [
    halaman_depan, halaman_data_pribadi, halaman_data_akademik, halaman_suliet,
    halaman_kkn, halaman_setting_password, halaman_krs, halaman_khs, halaman_tn
]

let title = ['Home', 'Data Pribadi', 'Data Akademik', 'Suliet', 'Kkn', 'Setting Password', 'Krs', 'Khs', 'Transkrip Nilai']

let buttonInContainer = [
    'bio_button', 'akademik_button', 'password_button',
    'krs_button', 'khs_button', 'tn_button'
]

let pagesWhenButtonIsClick = [
    halaman_data_pribadi, halaman_data_akademik, halaman_setting_password, halaman_krs, halaman_khs, halaman_tn
]

let pointerWhenButtonIsClick = [
    document.getElementById('pointer_bio'),
    document.getElementById('pointer_akademik'),
    document.getElementById('pointer_password'),
    document.getElementById('pointer_krs'),
    document.getElementById('pointer_khs'),
    document.getElementById('pointer_tn')
]

let closeSidebar = () => {
    sidebar.classList.toggle('-ml-96')
    iconListSidebar.classList.toggle('text-yellow-500')
    iconListSidebar.classList.toggle('dark:text-sky-500')
}

let pointerStyle = ['text-yellow-600', 'dark:text-sky-500' , 'font-medium', 'cursor-pointer', 'hover:text-white', 'hover:bg-yellow-500', 'hover:p-1', 'dark:hover:bg-sky-900', 'dark:hover:text-slate-300' ]

buttonListSidebar.addEventListener('click', closeSidebar)

showHalaman(halaman_krs)

// if (document.cookie) {
//     showHalaman(document.cookie)
//     document.title = title[pages.indexOf(document.cookie)]
// } else showHalaman(halaman_depan)

setActivePointer(document.cookie)

isDataAkademikActivePointer(document.cookie)

toggleDarkMode.addEventListener('click', () => {
    toggleDarkModeChild.classList.toggle('ml-auto')
    htmlTag.classList.toggle('dark')
    iconTerang.classList.toggle('text-yellow-500')
    iconTerang.classList.toggle('text-slate-400')
    iconGelap.classList.toggle('text-sky-500')
    iconGelap.classList.toggle('text-slate-400')
})

pointers.forEach((pointer, index) => {
    pointer.addEventListener('click',() => {
        if(!pointer.hasAttribute('active')) {

            //buka tutup list data akademik
            openAndCloseListAkademikPages(index)

            //ganti tampilan pointer
            changePointer(pointer, activePointer)

            //perbarui halaman
            clearHalaman()
            showHalaman(pages[index])
            closeSidebar()

            document.cookie = pages[index]
            document.title = title[index]
        } 
    })
})

function openAndCloseListAkademikPages(index) {
    let indexPages = [2,6,7,8]
    let resultCheckActivePointer = false

    indexPages.every((it) => {
        if(activePointer == pointers[it]) {
            resultCheckActivePointer = true
            return false
        } return true
    })

    if(!resultCheckActivePointer && index == 2) listAkademikPages.classList.toggle('hidden')
    if(resultCheckActivePointer && !indexPages.includes(index)) listAkademikPages.classList.toggle('hidden')
}

function isDataAkademikActivePointer(cookie) {
    let indexPages = [2,6,7,8]

    indexPages.every((it) => {
        if (cookie == pages[it]) {
            listAkademikPages.classList.toggle('hidden')
            return false
        } return true
    })
}

function setActivePointer(cookie) {
    let pointer = null

    if (cookie)
        pages.every((it , index) => {

        if (cookie == it) {
            pointer = pointers[index]
            return false
        } else pointer = pointers[2]

        return true
        })
    else pointer = pointers[0]

    toggleClass(pointer)
    pointer.setAttribute('active','')
    activePointer = pointer
}

function toggleClass(pointer) {
    pointerStyle.forEach((it) => {
        pointer.classList.toggle(it)
    })
}

function changePointer(pointer) {
    toggleClass(pointer)
    pointer.setAttribute('active','')  
    toggleClass(activePointer)
    activePointer.removeAttribute('active')
    activePointer = pointer
}

function clearHalaman() {
    container_halaman.innerHTML = ' '
    loader.classList.remove('hidden')
}

function showHalaman(halaman) {
    fetch(halaman)
    .then(response => response.text())
    .then(response => 
        setTimeout(() => {
            let button = null
            let bcAkademik = null

            loader.classList.add('hidden')
            container_halaman.innerHTML = response

            buttonInContainer.forEach((it, index) => {
                button = document.querySelector('.' + it)

                if(button) 
                    button.addEventListener('click',() => {
                        //ganti tampilan pointer
                        if (index < 6) changePointer(pointerWhenButtonIsClick[index], activePointer)

                        //perbarui tampilan
                        clearHalaman()
                        showHalaman(pagesWhenButtonIsClick[index])

                        document.cookie = pagesWhenButtonIsClick[index]
                        document.title = title[index]
                    })
            })

            bcAkademik = document.querySelector('.bc_akademik')
            
            if (bcAkademik)
                bcAkademik.addEventListener('click',() => {
                    //ganti tampilan pointer
                    changePointer(pointers[2], activePointer)

                    //perbarui tampilan
                    clearHalaman()
                    showHalaman(pages[2])

                    document.cookie = pages[2]
                    document.title = title[2]
                })

            
        }, 200)
    )
}
