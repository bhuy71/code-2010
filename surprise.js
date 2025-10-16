// Text configuration
const textConfig = {
    text1: "Hí lô em 💖",
    text2: "Chúc mừng 20/10 nhé! 🌹",
    text3: "Em có muốn nhận quà không? 🎁",
    text4: "Nhớ suy kĩ rồi chọn nhé! 💭",
    text5: "Kó",
    text6: "Có",
    text7: "Nêu nhận xét về anh đi (tối thiểu 10 ký tự) 💝",
    text8: "Gửi 💌",
    text9: "Anh quá đẹp trai! 💕",
    text10: "Anh biết mà! 😊",
    text11: "Cảm ơn em vì đã thành thật! 🥰",
    text12: "Okii nhận quà thôi! 🎁✨",
};

// DOM ready
document.addEventListener('DOMContentLoaded', function () {
    // Hide preloader after a short delay
    setTimeout(function () {
        showFirstQuestion();
        document.getElementById('preloader').classList.add('hidden');
    }, 1500);

    // Set text content
    document.getElementById('text3').textContent = textConfig.text3;
    document.getElementById('text4').textContent = textConfig.text4;
    document.getElementById('no').innerHTML = textConfig.text6;
    document.getElementById('yes').innerHTML = textConfig.text5;

    // Setup button events
    setupButtons();
});

// Show first question with SweetAlert
function showFirstQuestion() {
    Swal.fire({
        title: textConfig.text1,
        text: textConfig.text2,
        imageUrl: 'assets/rabbit.jpg',
        imageWidth: 300,
        imageHeight: 300,
        imageAlt: 'Cute image',
        confirmButtonText: 'Tiếp tục 💖',
        confirmButtonColor: '#ff6b9d',
        background: '#ffe8f0',
        backdrop: 'rgba(255, 182, 216, 0.3)',
        customClass: {
            confirmButton: 'swal2-confirm'
        }
    }).then(function () {
        const content = document.querySelector('.content');
        content.style.display = 'block';
        content.classList.add('show');

        // Try to play background music
        const bgMusic = document.getElementById('bgMusic');
        if (bgMusic) {
            bgMusic.play().catch(e => console.log('Auto-play prevented'));
        }
    });
}

// Setup button interactions
function setupButtons() {
    const yesBtn = document.getElementById('yes');
    const noBtn = document.getElementById('no');
    let clickCount = 0;

    // No button - move randomly
    noBtn.addEventListener('mouseover', function () {
        moveButton(noBtn);
    });

    noBtn.addEventListener('click', function (e) {
        e.preventDefault();
        moveButton(noBtn);
    });

    // Yes button - show success
    yesBtn.addEventListener('click', function () {
        showInputDialog();
    });
}

// Move button to random position (limited range)
function moveButton(button) {
    // Get viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Get button dimensions
    const buttonWidth = button.offsetWidth;
    const buttonHeight = button.offsetHeight;

    // Define safe zone (center 60% of screen)
    const minX = viewportWidth * 0.2;
    const maxX = viewportWidth * 0.8 - buttonWidth;
    const minY = viewportHeight * 0.3;
    const maxY = viewportHeight * 0.7 - buttonHeight;

    // Generate random position within safe zone
    const randomX = minX + Math.random() * (maxX - minX);
    const randomY = minY + Math.random() * (maxY - minY);

    button.style.position = 'fixed';
    button.style.left = randomX + 'px';
    button.style.top = randomY + 'px';
    button.style.transition = 'all 0.3s ease';
}

// Show input dialog
function showInputDialog() {
    // Hide the content with buttons
    const content = document.querySelector('.content');
    content.style.display = 'none';
    content.classList.remove('show');

    Swal.fire({
        title: textConfig.text7,
        html: '<input type="text" id="swal-input" class="swal2-input" placeholder="Viết điều gì đó đi..." style="font-family: \'Quicksand\', sans-serif; border: 2px solid #ffb6d9; border-radius: 15px; padding: 15px;">',
        confirmButtonText: textConfig.text8,
        confirmButtonColor: '#ff6b9d',
        background: '#ffe8f0',
        backdrop: 'rgba(255, 182, 216, 0.3)',
        showCancelButton: false,
        allowOutsideClick: false,
        preConfirm: () => {
            const input = document.getElementById('swal-input').value;
            if (!input || input.length < 10) {
                Swal.showValidationMessage('Phải viết ít nhất 10 ký tự nhé! 💕');
                return false;
            }
            return input;
        },
        customClass: {
            confirmButton: 'swal2-confirm'
        }
    }).then((result) => {
        if (result.isConfirmed && result.value) {
            showFinalMessage(result.value);
        }
    });

    // Auto-fill effect
    setTimeout(() => {
        const input = document.getElementById('swal-input');
        if (input) {
            input.focus();
            animateText(input, textConfig.text9);
        }
    }, 300);
}

// Animate text typing
function animateText(input, text) {
    let index = 0;
    input.value = '';

    const interval = setInterval(() => {
        if (index < text.length) {
            input.value += text[index];
            index++;
        } else {
            clearInterval(interval);
        }
    }, 100);
}

// Show final success message
function showFinalMessage(userInput) {
    Swal.fire({
        title: textConfig.text10,
        html: `
            <p style="font-size: 20px; color: #ff8fb5; margin-bottom: 20px;">${textConfig.text11}</p>
            <p style="font-size: 18px; color: #ffb6d9; font-style: italic;">"${userInput}"</p>
        `,
        confirmButtonText: textConfig.text12,
        confirmButtonColor: '#ff6b9d',
        background: '#ffe8f0',
        imageUrl: 'assets/flower-bouquet.gif',
        imageWidth: 250,
        imageHeight: 250,
        imageAlt: 'Flowers',
        backdrop: 'rgba(255, 182, 216, 0.3)',
        customClass: {
            confirmButton: 'swal2-confirm'
        }
    }).then(() => {
        // Redirect back to main page or show a special video/page
        Swal.fire({
            title: '🎉 Quà của em đây! 🎁',
            html: '<p style="font-size: 18px; color: #ff8fb5;">Hãy xem video này nhé! 💖</p>',
            confirmButtonText: 'Xem ngay! ✨',
            confirmButtonColor: '#ff6b9d',
            background: '#ffe8f0',
            customClass: {
                confirmButton: 'swal2-confirm'
            }
        }).then(() => {
            // Open a video or redirect back
            window.open('https://www.tiktok.com/@hhaminguyen/video/7290813979507608833?_d=secCgYIASAHKAESPgo8UivEh9jQLuTsecj4N8qeFd0xJWH%2BaXS7YV%2F2YwZPcFytDkdbSlXxaVRxzk%2BATQjqo9EANWmKB%2Byn5oIbGgA%3D&_r=1&_svg=1&checksum=130dd7e14539086fa27be7347ab523dcd95cbcb940feff69aac0b746f5e3addc&item_author_type=2&link_reflow_popup_iteration_sharer=%7B%22follow_to_play_duration%22%3A-1%2C%22dynamic_cover%22%3A1%2C%22click_empty_to_play%22%3A1%2C%22profile_clickable%22%3A1%7D&mid=7039970417867492098&preview_pb=0&region=VN&sec_user_id=MS4wLjABAAAA67UC4_s57fzheJMvri__I0GaHoMEgV4re-ILZROskLkkL6cTm0xy3rnQTKHb49WR&share_app_id=1180&share_item_id=7290813979507608833&share_link_id=28A4F68C-97E7-4792-9927-84408CFD1273&share_scene=2&sharer_language=vi&social_share_type=0&source=h5_t&timestamp=1760572911&tt_from=copy&u_code=dbm8f1df6dbamd&ug_btm=b6880%2Cb2878&user_id=6814853942816687105&utm_campaign=client_share&utm_medium=ios&utm_source=copy', '_blank');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        });
    });
}
