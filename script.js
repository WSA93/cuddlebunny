
        document.addEventListener('DOMContentLoaded', () => {
            // Navbar Scroll Effect
            const navbar = document.getElementById('navbar');
            window.addEventListener('scroll', () => {
                if (window.scrollY > 20) {
                    navbar.classList.add('shadow-sm');
                    navbar.classList.replace('py-4', 'py-2');
                } else {
                    navbar.classList.remove('shadow-sm');
                    navbar.classList.replace('py-2', 'py-4');
                }
            });

            // Intersection Observer for Reveal Animations (Scrollytelling)
            const revealElements = document.querySelectorAll('.reveal');
            
            const revealOptions = {
                threshold: 0.15,
                rootMargin: "0px 0px -50px 0px"
            };

            const revealObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                        // Optional: Stop observing once revealed
                        observer.unobserve(entry.target);
                    }
                });
            }, revealOptions);

            revealElements.forEach(el => {
                revealObserver.observe(el);
            });

            // Mobile Menu Logic
            const mobileMenuBtn = document.getElementById('mobile-menu-btn');
            const mobileMenu = document.getElementById('mobile-menu');
            const mobileMenuIcon = mobileMenuBtn.querySelector('i');
            let isMobileMenuOpen = false;

            mobileMenuBtn.addEventListener('click', () => {
                isMobileMenuOpen = !isMobileMenuOpen;
                if (isMobileMenuOpen) {
                    mobileMenu.classList.remove('opacity-0', 'pointer-events-none');
                    mobileMenuIcon.classList.replace('ph-list', 'ph-x');
                    document.body.style.overflow = 'hidden'; // Prevent background scrolling
                } else {
                    mobileMenu.classList.add('opacity-0', 'pointer-events-none');
                    mobileMenuIcon.classList.replace('ph-x', 'ph-list');
                    document.body.style.overflow = '';
                }
            });

            // Close mobile menu when a link is clicked
            const mobileLinks = mobileMenu.querySelectorAll('a');
            mobileLinks.forEach(link => {
                link.addEventListener('click', () => {
                    isMobileMenuOpen = false;
                    mobileMenu.classList.add('opacity-0', 'pointer-events-none');
                    mobileMenuIcon.classList.replace('ph-x', 'ph-list');
                    document.body.style.overflow = '';
                });
            });

            // Set Dynamic Copyright Year
            document.getElementById('current-year').textContent = new Date().getFullYear();

            // Modal Logic
            const modal = document.getElementById('reservation-modal');
            const openBtns = document.querySelectorAll('.open-modal-btn');
            const closeBtn = document.getElementById('close-modal');
            const backdrop = document.getElementById('modal-backdrop');
            const modalContent = document.getElementById('modal-content');
            const modalLocationLinks = document.querySelectorAll('.modal-location-link');

            function openModal(e) {
                e.preventDefault();
                modal.classList.remove('hidden');
                modal.classList.add('flex'); // Switch from hidden to flex to center it
                
                // Small delay to allow display:flex to apply before animating opacity
                setTimeout(() => {
                    backdrop.classList.remove('opacity-0');
                    modalContent.classList.remove('opacity-0', 'scale-95');
                    modalContent.classList.add('opacity-100', 'scale-100');
                }, 10);
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            }

            function closeModal() {
                backdrop.classList.add('opacity-0');
                modalContent.classList.remove('opacity-100', 'scale-100');
                modalContent.classList.add('opacity-0', 'scale-95');
                
                setTimeout(() => {
                    modal.classList.remove('flex');
                    modal.classList.add('hidden');
                    document.body.style.overflow = ''; // Restore background scrolling
                }, 300); // Matches the duration-300 transition
            }

            // Attach event listener to all buttons with the class
            openBtns.forEach(btn => {
                btn.addEventListener('click', openModal);
            });
            if (closeBtn) closeBtn.addEventListener('click', closeModal);
            if (backdrop) backdrop.addEventListener('click', closeModal);

            // Close modal when a location link is clicked
            modalLocationLinks.forEach(link => {
                link.addEventListener('click', () => {
                    closeModal();
                });
            });
            
            // Close modal on Escape key press
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
                    closeModal();
                }
            });
        });

