    // Отправка данных на сервер // Send data to server ===================================================================

    import {openModal, closeModal} from './modal';
    import {postData} from '../services/services';

    function forms(formSelector, modalTimerId) {

        const forms = document.querySelectorAll(formSelector);

        const message = {
            loading: "Загрузка...",
            success: "Скоро мы с вами свяжемся!",
            failure: "Чтото пошло не так!"
        };

        forms.forEach(item => {
            bindPostData(item);
        });

        function bindPostData(form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();

                const statusMessage = document.createElement('div');
                statusMessage.classList.add('status');
                statusMessage.textContent = message.loading;

                //form.append(statusMessage);
                form.insertAdjacentElement('afterend', statusMessage);

                /* Отправка данных, старая форма
                const request = new XMLHttpRequest();
                request.open('POST', 'server.php');

                request.setRequestHeader('Content-type', 'application/json');
                const formData = new FormData(form);

                let object = {};
                formData.forEach((item, key) => {
                    object[key] = item;
                });

                const json = JSON.stringify(object);

                request.send(json);

                request.addEventListener('load', () => {
                    if (request.status === 200) {
                        console.log(request.response);
                        showThanksModal(message.success);
                        form.reset();
                        setTimeout(() => {
                            statusMessage.remove();
                        }, 2000);
                    } else {
                        showThanksModal(message.failure);
                    }
                });
                */

                // Отправка данных, новая форма

                const formData = new FormData(form);

                let json = JSON.stringify(Object.fromEntries(formData.entries()));

                postData('http://localhost:3000/requests', json)
                    .then(data => {
                        console.log(data);
                        showThanksModal(message.success);
                        setTimeout(() => {
                            statusMessage.remove();
                        }, 2000);
                    })
                    .catch(() => {
                        showThanksModal(message.failure);
                    })
                    .finally(() => {
                        form.reset();
                    });
            });
        }

        // Perfect modal show

        function showThanksModal(message) {
            const prevModalDialog = document.querySelector(".modal__dialog");

            prevModalDialog.classList.add('hide');
            openModal('.modal', modalTimerId);

            const thanksModal = document.createElement('div');
            thanksModal.classList.add('modal__dialog');
            thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

            document.querySelector('.modal').append(thanksModal);
            setTimeout(() => {
                thanksModal.remove();
                prevModalDialog.classList.add('show');
                prevModalDialog.classList.remove('hide');
                closeModal('.modal');
            }, 4000);
        }

    }

    export default forms;