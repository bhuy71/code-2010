// Current screen tracker
let currentScreen = 1;
let currentCardIndex = 0;

// Card messages matching the screenshots
const cardMessages = [
    {
        title: "Gửi em 🌹",
        text: "Hôm nay là 20/10 một ngày đặc biệt dành<br>cho những người con gái đặc biệt.<br><br>Em là một trong số đó của mình, ấm áp và<br>luôn mang lại cảm giác ấm áp, dễ chịu cho những<br>người xung quanh.<br><br>Chạm vào bông hoa em nhé."
    },
    {
        title: "Gửi em 💕",
        text: "Em là người đặc biệt và đáng yêu làm đấy"
    },
    {
        title: "Gửi em ❤️",
        text: "Cảm ơn em đã luôn là chính mình ❤️"
    },
    {
        title: "Gửi em 🌸",
        text: "Chúc em một ngày mới thật tươi đẹp!"
    },
    {
        title: "Gửi em 🤗",
        text: "Gửi đến em một cái ôm thật ấm áp"
    }
];

// Wishes for each photo in universe
const photoWishes = [
    "💖 Omg,ờm thì cũng gọi là chinh gái !",
    "🌟 Ảnh này xinh quá z trời!",
    "🌹 Ảnh này trông ngoan hiền ghê á!",
    "✨ Ảnh này trông ngại ngùng thế!",
    "🎀 Cười không thấy mắt đâu luôn , nma vẫn xinh nên bỏ qua hihi!",
    "💝 Rấc là xinh nha!",
    "🌸 Khum bít nhận xét như nào!",
    "🎉 Khum thấy mặt nma vẫn bít là xinh nha!",
    "💖 Cũng gọi là ucila!",
    "💖 Ảnh này vừa mờ vừa lem!",
    "💖 Tư liệu quý hehe!",

];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initScreen1();
});

// ===== SCREEN 1: BUNNY =====
function initScreen1() {
    const bunnyCard = document.getElementById('bunnyCard');

    if (!bunnyCard) {
        return;
    }

    bunnyCard.addEventListener('click', () => {
        transitionToScreen(2);
        setTimeout(() => {
            startFlowerAnimation();
        }, 500);
    });

    // Also make the entire screen clickable as backup
    const screen1 = document.getElementById('screen1');
    if (screen1) {
        screen1.addEventListener('click', (e) => {
            if (e.target.closest('.bunny-card') || e.target.closest('.touch-text')) {
                transitionToScreen(2);
                setTimeout(() => {
                    startFlowerAnimation();
                }, 500);
            }
        });
    }
}

function transitionToScreen(screenNum) {
    const current = document.querySelector('.screen.active');
    const next = document.getElementById(`screen${screenNum}`);

    if (current) {
        current.classList.remove('active');
    }

    if (next) {
        next.classList.add('active');
    }

    currentScreen = screenNum;
}

// ===== SCREEN 2: FLOWER ANIMATION =====
function startFlowerAnimation() {
    createFloatingStickers();

    const envelope = document.getElementById('envelope');

    // Show envelope/letter after a delay (flowers are already animated via CSS or GIF)
    setTimeout(() => {
        if (envelope) {
            envelope.classList.add('show');
            envelope.addEventListener('click', showMessageCard);
        }
    }, 2000);
}

function animateElement(element, property, targetValue, duration) {
    if (!element) return;

    element.style.transition = `${property} ${duration}ms ease`;
    element.style[property] = targetValue;
}

function createFloatingStickers() {
    const container = document.getElementById('floatingStickers');
    const stickers = ['👧🏻', '👩🏻', '💁🏻‍♀️', '🙋🏻‍♀️'];
    const count = 6; // Giảm số lượng xuống 6

    // Vị trí cố định hợp lý cho 6 ảnh
    const positions = [
        { left: '15%', top: '20%' },
        { left: '85%', top: '25%' },
        { left: '10%', top: '60%' },
        { left: '88%', top: '65%' },
        { left: '20%', top: '85%' },
        { left: '80%', top: '85%' }
    ];

    for (let i = 0; i < count; i++) {
        const sticker = document.createElement('div');
        sticker.className = 'girl-sticker';
        sticker.innerHTML = stickers[i % stickers.length];

        // Vị trí cố định
        sticker.style.left = positions[i].left;
        sticker.style.top = positions[i].top;

        // Animation
        sticker.style.animationDelay = (i * 0.3) + 's';
        sticker.style.animationDuration = '8s';

        // Kích thước đồng nhất
        sticker.style.fontSize = '55px';

        container.appendChild(sticker);

        // Fade in
        setTimeout(() => {
            sticker.style.opacity = '0.7';
            sticker.style.transition = 'opacity 1s ease';
        }, i * 150 + 2000);
    }

    container.style.opacity = '1';
}

function showMessageCard() {
    const envelope = document.getElementById('envelope');
    const messageCard = document.getElementById('messageCard');
    const cardTitle = document.getElementById('cardTitle');
    const cardText = document.getElementById('cardText');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    // Hide envelope
    envelope.style.display = 'none';

    // Show card with current message
    updateCardContent();
    messageCard.classList.add('show');

    // Add navigation button listeners
    prevBtn.addEventListener('click', showPrevCard);
    nextBtn.addEventListener('click', showNextCard);

    // Update button states
    updateNavigationButtons();
}

function updateCardContent() {
    const cardTitle = document.getElementById('cardTitle');
    const cardText = document.getElementById('cardText');

    const message = cardMessages[currentCardIndex];
    cardTitle.textContent = message.title;
    cardText.innerHTML = message.text;
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    // Disable/enable previous button
    prevBtn.disabled = currentCardIndex === 0;

    // Change text of next button on last card
    if (currentCardIndex === cardMessages.length - 1) {
        nextBtn.textContent = 'Tiếp tục →';
    } else {
        nextBtn.textContent = 'Tiếp →';
    }
}

function showPrevCard() {
    if (currentCardIndex > 0) {
        currentCardIndex--;
        updateCardContent();
        updateNavigationButtons();
    }
}

function showNextCard() {
    if (currentCardIndex < cardMessages.length - 1) {
        // Go to next card
        currentCardIndex++;
        updateCardContent();
        updateNavigationButtons();
    } else {
        // Go to universe on last card
        const messageCard = document.getElementById('messageCard');
        messageCard.classList.remove('show');

        setTimeout(() => {
            transitionToScreen(3);
            setTimeout(() => initUniverse(), 500);
        }, 500);
    }
}

// ===== SCREEN 3: UNIVERSE 3D =====
let scene, camera, renderer;
let planet, planetRing;
let photoMeshes = [];
let isDragging = false;
let previousMouse = { x: 0, y: 0 };
let cameraAngle = { theta: 0, phi: 0.3 };
let cameraDistance = 50;

function initUniverse() {
    const canvas = document.getElementById('universe');

    // Scene setup
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000011, 0.0005);

    // Camera
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    updateCameraPosition();

    // Renderer
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000011);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1, 150);
    pointLight.position.set(0, 0, 0);
    scene.add(pointLight);

    // Stars
    createStars();

    // Pink planet with heart ring
    createPlanetWithHeartRing();

    // Photo frames orbiting
    createPhotoFrames();

    // Controls
    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('wheel', onMouseWheel);
    canvas.addEventListener('click', onPhotoClick);

    // Touch support
    canvas.addEventListener('touchstart', onTouchStart, { passive: false });
    canvas.addEventListener('touchmove', onTouchMove, { passive: false });
    canvas.addEventListener('touchend', onTouchEnd);

    window.addEventListener('resize', onWindowResize);

    // Surprise button event
    const surpriseBtn = document.getElementById('surpriseBtn');
    if (surpriseBtn) {
        surpriseBtn.addEventListener('click', () => {
            window.location.href = 'surprise.html';
        });
    }

    // Start animation
    animate();
}

function createStars() {
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 5000;
    const positions = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 400;
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const starMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.7,
        transparent: true,
        opacity: 0.8
    });

    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);
}

function createPlanetWithHeartRing() {
    // Beautiful pink planet with realistic texture
    const planetGeometry = new THREE.SphereGeometry(8, 128, 128);

    // Create realistic planet texture with noise
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Base gradient for light pink
    const gradient = ctx.createLinearGradient(0, 0, 1024, 512);
    gradient.addColorStop(0, '#f9a8d4');
    gradient.addColorStop(0.5, '#fbb6d8');
    gradient.addColorStop(1, '#fbcfe8');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1024, 512);

    // Add cloud-like patterns
    for (let i = 0; i < 100; i++) {
        const x = Math.random() * 1024;
        const y = Math.random() * 512;
        const size = Math.random() * 80 + 40;
        const opacity = Math.random() * 0.3 + 0.1;

        ctx.fillStyle = `rgba(236, 72, 153, ${opacity})`;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(244, 114, 182, ${opacity * 0.5})`;
        ctx.beginPath();
        ctx.arc(x + size * 0.3, y - size * 0.2, size * 0.7, 0, Math.PI * 2);
        ctx.fill();
    }

    const planetTexture = new THREE.CanvasTexture(canvas);

    const planetMaterial = new THREE.MeshPhongMaterial({
        map: planetTexture,
        color: 0xfbb6d8,
        emissive: 0xf9a8d4,
        emissiveIntensity: 0.25,
        shininess: 100,
        specular: 0xffffff,
        bumpScale: 0.5
    });

    planet = new THREE.Mesh(planetGeometry, planetMaterial);
    scene.add(planet);

    // Add "Chúc em tất cả" text on top of planet
    createPlanetText();

    // Beautiful heart ring around planet
    createHeartRing();
}

function createPlanetText() {
    // Create canvas for text texture
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    // Background transparent
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Text styling
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 60px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Add shadow for better visibility
    ctx.shadowColor = 'rgba(255, 107, 157, 0.8)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;

    ctx.fillText('Chúc em tất cả', canvas.width / 2, canvas.height / 3);

    // Create texture from canvas
    const texture = new THREE.CanvasTexture(canvas);

    // Create sprite with text
    const spriteMaterial = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        opacity: 0.95
    });
    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.position.set(0, 12, 0);
    sprite.scale.set(20, 10, 1);
    scene.add(sprite);
}

function createHeartRing() {
    const mainGroup = new THREE.Group();

    // Create heart shape function
    function createHeartShape(scale = 1) {
        const shape = new THREE.Shape();
        const x = 0, y = 0;
        shape.moveTo(x, y);
        shape.bezierCurveTo(x, y - 0.3 * scale, x - 0.5 * scale, y - 0.3 * scale, x - 0.5 * scale, y);
        shape.bezierCurveTo(x - 0.5 * scale, y + 0.3 * scale, x, y + 0.5 * scale, x, y + 0.8 * scale);
        shape.bezierCurveTo(x, y + 0.5 * scale, x + 0.5 * scale, y + 0.3 * scale, x + 0.5 * scale, y);
        shape.bezierCurveTo(x + 0.5 * scale, y - 0.3 * scale, x, y - 0.3 * scale, x, y);
        return shape;
    }

    // Heart material - light pink
    const heartMaterial = new THREE.MeshPhongMaterial({
        color: 0xfbb6d8,
        emissive: 0xf9a8d4,
        emissiveIntensity: 0.4,
        shininess: 100,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.9
    });

    // Create two rings of hearts - similar radius but different tilt
    // 12 degrees = 0.209 radians
    const rings = [
        { radius: 11, heartCount: 42, tilt: 0.209, heartSize: 0.38 },
        { radius: 11.5, heartCount: 44, tilt: -0.209, heartSize: 0.36 }
    ];

    rings.forEach((ringConfig) => {
        // Create separate group for each ring
        const ringGroup = new THREE.Group();
        const angleStep = (Math.PI * 2) / ringConfig.heartCount;

        for (let i = 0; i < ringConfig.heartCount; i++) {
            const angle = angleStep * i;

            // Create heart geometry
            const heartShape = createHeartShape(ringConfig.heartSize);
            const extrudeSettings = {
                depth: 0.3,
                bevelEnabled: true,
                bevelThickness: 0.05,
                bevelSize: 0.05,
                bevelSegments: 3
            };

            const heartGeometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
            const heart = new THREE.Mesh(heartGeometry, heartMaterial);

            // Position on ring
            const x = Math.cos(angle) * ringConfig.radius;
            const z = Math.sin(angle) * ringConfig.radius;
            heart.position.set(x, 0, z);

            // Rotate to face outward
            heart.rotation.y = -angle + Math.PI / 2;
            heart.rotation.x = Math.PI / 2;

            // Add slight random rotation for natural look
            heart.rotation.z = (Math.random() - 0.5) * 0.2;

            ringGroup.add(heart);
        }

        // Apply tilt to this ring group
        ringGroup.rotation.x = ringConfig.tilt;

        // Add this ring to main group
        mainGroup.add(ringGroup);
    });

    planetRing = mainGroup;
    scene.add(mainGroup);
}

function createPhotoFrames() {
    const photoFiles = [
        'photos/s1.png',
        'photos/s2.png',
        'photos/s3.png',
        'photos/s4.png',
        'photos/s5.png',
        'photos/s6.png',
        'photos/s7.png',
        'photos/s8.png',
        'photos/s9.png',
        'photos/s10.png',
        'photos/s11.png'
    ];

    const orbitRadius = 25;
    const angleStep = (Math.PI * 2) / photoFiles.length;

    photoFiles.forEach((photoPath, index) => {
        const angle = angleStep * index;
        const x = Math.cos(angle) * orbitRadius;
        const z = Math.sin(angle) * orbitRadius;
        const y = (Math.random() - 0.5) * 8;

        // Frame geometry
        const frameGeometry = new THREE.PlaneGeometry(6, 8);

        // Load photo texture
        const textureLoader = new THREE.TextureLoader();

        // Create material first (will be updated when texture loads)
        const frameMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            side: THREE.DoubleSide
        });

        // Load texture
        textureLoader.load(
            photoPath,
            // SUCCESS callback (tham số 2) - Khi load thành công
            (loadedTexture) => {
                console.log('✅ Loaded:', photoPath);
                frameMaterial.map = loadedTexture;
                frameMaterial.needsUpdate = true;
            },
            // PROGRESS callback (tham số 3)
            undefined,
            // ERROR callback (tham số 4) - Khi có lỗi
            (error) => {
                console.error('❌ Failed to load:', photoPath);
                // Create pink placeholder
                const canvas = document.createElement('canvas');
                canvas.width = 512;
                canvas.height = 512;
                const ctx = canvas.getContext('2d');

                const gradient = ctx.createLinearGradient(0, 0, 512, 512);
                gradient.addColorStop(0, '#ff9eb5');
                gradient.addColorStop(1, '#ffb6c8');
                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, 512, 512);

                ctx.fillStyle = '#fff';
                ctx.font = 'bold 200px Arial';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText('💕', 256, 256);

                const placeholderTexture = new THREE.CanvasTexture(canvas);
                frameMaterial.map = placeholderTexture;
                frameMaterial.needsUpdate = true;
            }
        );

        const frame = new THREE.Mesh(frameGeometry, frameMaterial);
        frame.position.set(x, y, z);
        frame.lookAt(camera.position);

        // Store metadata
        frame.userData = {
            index,
            photoPath,
            wish: photoWishes[index % photoWishes.length],
            orbitAngle: angle,
            orbitRadius,
            orbitSpeed: 0.0008 + Math.random() * 0.0004,
            initialY: y
        };

        scene.add(frame);
        photoMeshes.push(frame);
    });
}

function animate() {
    requestAnimationFrame(animate);

    // Rotate planet
    if (planet) {
        planet.rotation.y += 0.002;
    }

    // Rotate heart ring
    if (planetRing) {
        planetRing.rotation.y += 0.005;
        planetRing.rotation.x = Math.sin(Date.now() * 0.001) * 0.1;
    }

    // Orbit photo frames
    photoMeshes.forEach(frame => {
        frame.userData.orbitAngle += frame.userData.orbitSpeed;

        const x = Math.cos(frame.userData.orbitAngle) * frame.userData.orbitRadius;
        const z = Math.sin(frame.userData.orbitAngle) * frame.userData.orbitRadius;
        const y = frame.userData.initialY + Math.sin(Date.now() * 0.001 + frame.userData.index) * 1;

        frame.position.set(x, y, z);
        frame.lookAt(camera.position);
    });

    renderer.render(scene, camera);
}

function updateCameraPosition() {
    camera.position.x = cameraDistance * Math.sin(cameraAngle.theta) * Math.cos(cameraAngle.phi);
    camera.position.y = cameraDistance * Math.sin(cameraAngle.phi);
    camera.position.z = cameraDistance * Math.cos(cameraAngle.theta) * Math.cos(cameraAngle.phi);
    camera.lookAt(0, 0, 0);
}

// Mouse controls
function onMouseDown(e) {
    isDragging = true;
    previousMouse = { x: e.clientX, y: e.clientY };
}

function onMouseMove(e) {
    if (!isDragging) return;

    const deltaX = e.clientX - previousMouse.x;
    const deltaY = e.clientY - previousMouse.y;

    cameraAngle.theta -= deltaX * 0.005;
    cameraAngle.phi += deltaY * 0.005;
    cameraAngle.phi = Math.max(-Math.PI / 2 + 0.1, Math.min(Math.PI / 2 - 0.1, cameraAngle.phi));

    updateCameraPosition();

    previousMouse = { x: e.clientX, y: e.clientY };
}

function onMouseUp() {
    isDragging = false;
}

function onMouseWheel(e) {
    e.preventDefault();
    cameraDistance += e.deltaY * 0.05;
    cameraDistance = Math.max(20, Math.min(80, cameraDistance));
    updateCameraPosition();
}

// Touch controls
let touchStart = { x: 0, y: 0 };

function onTouchStart(e) {
    e.preventDefault();
    if (e.touches.length === 1) {
        isDragging = true;
        touchStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        previousMouse = touchStart;
    }
}

function onTouchMove(e) {
    e.preventDefault();
    if (!isDragging || e.touches.length !== 1) return;

    const deltaX = e.touches[0].clientX - previousMouse.x;
    const deltaY = e.touches[0].clientY - previousMouse.y;

    cameraAngle.theta -= deltaX * 0.005;
    cameraAngle.phi += deltaY * 0.005;
    cameraAngle.phi = Math.max(-Math.PI / 2 + 0.1, Math.min(Math.PI / 2 - 0.1, cameraAngle.phi));

    updateCameraPosition();

    previousMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
}

function onTouchEnd() {
    isDragging = false;
}

// Click on photo
function onPhotoClick(e) {
    if (isDragging) return;

    const mouse = new THREE.Vector2(
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1
    );

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(photoMeshes);

    if (intersects.length > 0) {
        showPhotoDetail(intersects[0].object);
    }
}

function showPhotoDetail(photoMesh) {
    const photoDetail = document.getElementById('photoDetail');
    const photoImg = document.getElementById('photoImg');
    const wishMessage = document.getElementById('wishMessage');
    const photoCardInner = document.getElementById('photoCardInner');
    const backBtn = document.getElementById('backBtn');

    // Reset flip
    photoCardInner.classList.remove('flipped');

    // Set photo and wish
    photoImg.src = photoMesh.userData.photoPath;
    wishMessage.textContent = photoMesh.userData.wish;

    // Show detail
    photoDetail.classList.add('show');

    // Click to flip
    photoCardInner.onclick = () => {
        photoCardInner.classList.toggle('flipped');
    };

    // Back button
    backBtn.onclick = (e) => {
        e.stopPropagation();
        photoDetail.classList.remove('show');
    };

    // Click background to close
    photoDetail.onclick = (e) => {
        if (e.target === photoDetail) {
            photoDetail.classList.remove('show');
        }
    };
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
