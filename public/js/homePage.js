const form = document.querySelector('form');

const createRoomBtn = document.getElementById('create-room-btn');
const joinRoomBtn = document.getElementById('join-room-btn');

const dialogEl = document.querySelector('dialog');
const dialogCloseBtn = document.getElementById('dialog-close-btn');

form.addEventListener('submit', (e) => {
    e.preventDefault();
});

createRoomBtn.addEventListener('click', () => {
    const formHTMLContent = `
                <p class="dialog_ask-name">How can we call you ?</p>
                <input class="cc-input" type="text" aria-label="Enter your name" placeholder="eg. John Doe"/>
    `
    form.insertAdjacentHTML('afterbegin', formHTMLContent);
    dialogEl.show();
});

joinRoomBtn.addEventListener('click', () => {
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



dialogCloseBtn.addEventListener('click', () => {
    form.innerHTML = `
                <p class="dialog_error_msg"></p>
                <button class="cr_submit_btn" type="submit">
                    Enter
                    <svg width="35" height="35" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 10C0 11.9778 0.58649 13.9112 1.6853 15.5557C2.78412 17.2002 4.3459 18.4819 6.17316 19.2388C8.00043 19.9957 10.0111 20.1937 11.9509 19.8078C13.8907 19.422 15.6725 18.4696 17.0711 17.0711C18.4696 15.6725 19.422 13.8907 19.8078 11.9509C20.1937 10.0111 19.9957 8.00043 19.2388 6.17316C18.4819 4.3459 17.2002 2.78412 15.5557 1.6853C13.9112 0.58649 11.9778 0 10 0C7.34783 0 4.80429 1.05357 2.92893 2.92893C1.05357 4.80429 0 7.34783 0 10ZM4.28571 9.28571H12.9643L8.97857 5.28071L10 4.28571L15.7143 10L10 15.7143L8.97857 14.695L12.9643 10.7143H4.28571V9.28571Z" fill="#858181"/>
                    </svg> 
                </button>
    `;

    dialogEl.close();
});
