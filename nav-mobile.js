(function () {
    /* Menu fermé dès le chargement (évite overlay ouvert en vue mobile) */
    if (typeof document !== 'undefined' && document.body) {
        document.body.classList.remove('nav-open');
    }

    function initNavMobile() {
        document.body.classList.remove('nav-open');

        var burger = document.querySelector('.burger-btn');
        var nav = document.getElementById('nav-menu');
        if (!burger || !nav) return;

        function open() {
            document.body.classList.add('nav-open');
            burger.setAttribute('aria-expanded', 'true');
            burger.setAttribute('aria-label', 'Fermer le menu');
        }
        function close() {
            document.body.classList.remove('nav-open');
            burger.setAttribute('aria-expanded', 'false');
            burger.setAttribute('aria-label', 'Ouvrir le menu');
        }
        function toggle() {
            if (document.body.classList.contains('nav-open')) close();
            else open();
        }

        burger.addEventListener('click', function (e) {
            e.preventDefault();
            toggle();
        });

        var closeBtn = document.querySelector('.nav-close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', function (e) {
                e.preventDefault();
                close();
            });
        }

        nav.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                close();
            });
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') close();
        });
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNavMobile);
    } else {
        initNavMobile();
    }
})();
