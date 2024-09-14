import {generateRoomCode} from '../client_utils/lib.js';

const createRoomBtn = document.getElementById('create-room-btn');
const joinRoomBtn = document.getElementById('join-room-btn');

const dialogEl = document.querySelector('dialog');

let cookie = null;

// document.addEventListener('DOMContentLoaded', async () => {
//     const res = await fetch('/cookie/check');
//     const data = await res.json();
//     cookie = data
//     console.log(data)
// });

createRoomBtn.addEventListener('click', () => {

    dialogEl.innerHTML = `
            <svg id="dialog-close-btn" class="dialog-close-btn" width="29" height="28" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M28.7347 22.4941L19.9372 14L28.7347 5.50592C28.9032 5.34117 28.9978 5.11891 28.9978 4.88732C28.9978 4.65574 28.9032 4.43348 28.7347 4.26873L24.5788 0.256176C24.4089 0.0921464 24.1784 0 23.9381 0C23.6978 0 23.4674 0.0921464 23.2974 0.256176L14.5 8.75026L5.70256 0.256176C5.53262 0.0921464 5.30216 0 5.06187 0C4.82158 0 4.59112 0.0921464 4.42118 0.256176L0.265325 4.26873C0.0954374 4.43281 0 4.65532 0 4.88732C0 5.11933 0.0954374 5.34184 0.265325 5.50592L9.06277 14L0.265325 22.4941C0.0954374 22.6582 0 22.8807 0 23.1127C0 23.3447 0.0954374 23.5672 0.265325 23.7313L4.42118 27.7438C4.59112 27.9079 4.82158 28 5.06187 28C5.30216 28 5.53262 27.9079 5.70256 27.7438L14.5 19.2497L23.2974 27.7438C23.4674 27.9079 23.6978 28 23.9381 28C24.1784 28 24.4089 27.9079 24.5788 27.7438L28.7347 23.7313C28.9046 23.5672 29 23.3447 29 23.1127C29 22.8807 28.9046 22.6582 28.7347 22.4941Z" fill="#858181"/>
            </svg>
                
            <form id="cc_form">
                <p class="dialog_error_msg"></p>
                <button class="cr_submit_btn" type="submit">
                    Enter
                    <svg width="35" height="35" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 10C0 11.9778 0.58649 13.9112 1.6853 15.5557C2.78412 17.2002 4.3459 18.4819 6.17316 19.2388C8.00043 19.9957 10.0111 20.1937 11.9509 19.8078C13.8907 19.422 15.6725 18.4696 17.0711 17.0711C18.4696 15.6725 19.422 13.8907 19.8078 11.9509C20.1937 10.0111 19.9957 8.00043 19.2388 6.17316C18.4819 4.3459 17.2002 2.78412 15.5557 1.6853C13.9112 0.58649 11.9778 0 10 0C7.34783 0 4.80429 1.05357 2.92893 2.92893C1.05357 4.80429 0 7.34783 0 10ZM4.28571 9.28571H12.9643L8.97857 5.28071L10 4.28571L15.7143 10L10 15.7143L8.97857 14.695L12.9643 10.7143H4.28571V9.28571Z" fill="#858181"/>
                    </svg> 
                </button>
            </form>
    `;

    const dialogCloseBtn = document.getElementById('dialog-close-btn');

    closeDialogBox(dialogCloseBtn)

    const form = document.getElementById('cc_form');

    const formHTMLContent = `
                <p class="dialog_ask-name">How can we call you ?</p>
                <input class="cc-input" name="name" type="text" aria-label="Enter your name" placeholder="eg. John Doe"/>

    `
    form.insertAdjacentHTML('afterbegin', formHTMLContent);
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const roomCode = generateRoomCode();
        const name = form.name.value;
        if (name.trim() === "") {
            console.log('true')
            const errorMsgEl = document.querySelector('.dialog_error_msg');
            errorMsgEl.textContent = "Your name is not your brain. It can't be empty.";
            return;
        } else if (name.trim()) {
            const errorMsgEl = document.querySelector('.dialog_error_msg');
            errorMsgEl.textContent = "";

            try {
                const res = await fetch('/room/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({name, roomCode})
                });
                const data = await res.json();
                window.location.href = `/room/built?rc=${data.roomCode}`;
            } catch (error) {
                console.error(error);
            }

        }
    });
    dialogEl.show();
});

joinRoomBtn.addEventListener('click', () => {

    dialogEl.innerHTML = `
            <svg id="dialog-close-btn" class="dialog-close-btn" width="29" height="28" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M28.7347 22.4941L19.9372 14L28.7347 5.50592C28.9032 5.34117 28.9978 5.11891 28.9978 4.88732C28.9978 4.65574 28.9032 4.43348 28.7347 4.26873L24.5788 0.256176C24.4089 0.0921464 24.1784 0 23.9381 0C23.6978 0 23.4674 0.0921464 23.2974 0.256176L14.5 8.75026L5.70256 0.256176C5.53262 0.0921464 5.30216 0 5.06187 0C4.82158 0 4.59112 0.0921464 4.42118 0.256176L0.265325 4.26873C0.0954374 4.43281 0 4.65532 0 4.88732C0 5.11933 0.0954374 5.34184 0.265325 5.50592L9.06277 14L0.265325 22.4941C0.0954374 22.6582 0 22.8807 0 23.1127C0 23.3447 0.0954374 23.5672 0.265325 23.7313L4.42118 27.7438C4.59112 27.9079 4.82158 28 5.06187 28C5.30216 28 5.53262 27.9079 5.70256 27.7438L14.5 19.2497L23.2974 27.7438C23.4674 27.9079 23.6978 28 23.9381 28C24.1784 28 24.4089 27.9079 24.5788 27.7438L28.7347 23.7313C28.9046 23.5672 29 23.3447 29 23.1127C29 22.8807 28.9046 22.6582 28.7347 22.4941Z" fill="#858181"/>
            </svg>
                
            <form id="jc_form">
                <p class="dialog_error_msg"></p>
                <button class="cr_submit_btn" type="submit">
                    Enter
                    <svg width="35" height="35" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 10C0 11.9778 0.58649 13.9112 1.6853 15.5557C2.78412 17.2002 4.3459 18.4819 6.17316 19.2388C8.00043 19.9957 10.0111 20.1937 11.9509 19.8078C13.8907 19.422 15.6725 18.4696 17.0711 17.0711C18.4696 15.6725 19.422 13.8907 19.8078 11.9509C20.1937 10.0111 19.9957 8.00043 19.2388 6.17316C18.4819 4.3459 17.2002 2.78412 15.5557 1.6853C13.9112 0.58649 11.9778 0 10 0C7.34783 0 4.80429 1.05357 2.92893 2.92893C1.05357 4.80429 0 7.34783 0 10ZM4.28571 9.28571H12.9643L8.97857 5.28071L10 4.28571L15.7143 10L10 15.7143L8.97857 14.695L12.9643 10.7143H4.28571V9.28571Z" fill="#858181"/>
                    </svg> 
                </button>
            </form>
    `;

    
    const dialogCloseBtn = document.getElementById('dialog-close-btn');

    closeDialogBox(dialogCloseBtn)
    
    const form = document.getElementById('jc_form');

    const formHTMLContent = `
                <div class="form-fields">
                    <p class="dialog_jc-an dialog-jc">How can we call you ?</p>
                    <input id="jc-name" class="jc-input" type="text" aria-label="Enter your name" placeholder="eg. John Doe"/>
                    <p class="dialog_jc-cc dialog-jc">Please enter class code !</p>
                    <input id="jc-classCode" class="jc-input" type="text" aria-label="Enter class code" placeholder="eg. Ab31GsZh"/>
                </div>
                `
    form.insertAdjacentHTML('afterbegin', formHTMLContent);
    dialogEl.show();
});


function closeDialogBox(el) {
    el.addEventListener('click', () => {
        dialogEl.close();
    });
    
}
