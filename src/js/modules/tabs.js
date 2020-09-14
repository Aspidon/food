    // Tabs ====================================================================

    function tabs(tabsSelector, tabsContentSelector, tabsParrentSelector, activeClass) {

        let tabs = document.querySelectorAll(tabsSelector),
            tabsContent = document.querySelectorAll(tabsContentSelector),
            tabsParent = document.querySelector(tabsParrentSelector);

        function hideTabContent() {
            tabsContent.forEach(item => {
                item.classList.add('hide');
                item.classList.remove('show', 'fade');
            });

            tabs.forEach(item => {
                item.classList.remove(activeClass);
            });
        }

        function showTabContent(i = 0) {
            tabsContent[i].classList.add('show', 'fade');
            tabsContent[i].classList.remove('hide');
            tabs[i].classList.add(activeClass);
        }

        hideTabContent();
        showTabContent();

        tabsParent.addEventListener('click', (event) => {
            let target = event.target;

            if (target && target.classList.contains(tabsSelector.slice(1))) {
                tabs.forEach((item, i) => {
                    if (item == target) {
                        hideTabContent();
                        showTabContent(i);
                    }
                });
            }
        });

    }

    export default tabs;