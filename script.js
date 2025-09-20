// Datos de los proyectos de Oqubo
const projects = [
    {
        id: 1,
        name: "The Oldest Art",
        image: "img/toa/icono512.png",
        description: "THE OLDest ART es un juego de cartas familiar que combina diversión y aprendizaje, basado en ilustraciones prehistóricas reales de cuevas del norte de España. Con mecánica sencilla de descarte por estrategia, pueden jugar de 2 a 4 personas desde los seis años, en partidas cortas y dinámicas. Cada carta muestra un arte rupestre, su cueva de origen, temática y técnica, mientras que seis cartas de acción añaden giros inesperados. Sin necesidad de conocimientos previos, los jugadores aprenden a reconocer animales, colores y técnicas del Paleolítico.",
        platforms: [
            { name: "Museo de Altamira", icon: "fas fa-store", url: "https://museoaltamira.com/" },
            { name: "Centro de interpretación Tito Bustillo", icon: "fas fa-store", url: "https://www.centrotitobustillo.com/es/" }
        ],
        screenshots: [
            "img/toa/1.jpg",
            "img/toa/2.jpg", 
            "img/toa/3.jpg",
            "img/toa/4.jpg",
            "img/toa/5.jpg",
            "img/toa/6.jpg"
        ]
    },
    {
        id: 2,
        name: "El Viaje",
        image: "img/elviaje/icono512.png",
        description: "El Viaje es un juego de rompecabezas familiar, gratuito y sin anuncios, en el que hay que intercambiar imágenes para alinear tres o más del mismo tipo. Ofrece un desafío visual con movimientos limitados, donde la dificultad radica en el número y la similitud de las imágenes en el tablero. Cuenta con una tabla de clasificación en línea para competir con otros jugadores. Las ilustraciones están basadas en la historia educativa para bebés \"El Viaje\", diseñada para entrenar la percepción visual.",
        platforms: [
            { name: "Android", icon: "fab fa-android", url: "https://play.google.com/store/apps/details?id=com.LHC.ElViajejuegodeemparejar" },
            { name: "iOS", icon: "fab fa-apple", url: "#" }
        ],
        screenshots: [
            "img/elviaje/1.png",
            "img/elviaje/2.png",
            "img/elviaje/3.png"
        ]
    },
    {
        id: 3,
        name: "Math Outside The Lines",
        image: "img/motl/icono512.png",
        description: "Un enfoque revolucionario para aprender matemáticas a través del arte y la creatividad. Explora conceptos matemáticos complejos mediante experiencias visuales interactivas que conectan números con expresiones artísticas.",
        platforms: [
            { name: "Android", icon: "fab fa-android", url: "#" },
            { name: "iOS", icon: "fab fa-apple", url: "#" }
        ],
        screenshots: [
            "img/motl/1.png",
            "img/motl/2.png",
            "img/motl/3.png"
        ]
    }
];

// Variables globales
let currentModal = null;
let currentImageModal = null;
let currentImageIndex = 0;
let currentProjectImages = [];

// Función para renderizar los proyectos
function renderProjects() {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    projects.forEach(project => {
        // Crear wrapper para cada proyecto
        const projectWrapper = document.createElement('div');
        projectWrapper.className = 'project-wrapper';
        
        // Crear la tarjeta clickeable
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.onclick = () => openModal(project);
        
        // Crear la imagen
        const projectImage = document.createElement('div');
        projectImage.className = 'project-image';
        
        // Si la imagen es una ruta, crear un elemento img, si no, usar como emoji
        if (project.image.includes('.png') || project.image.includes('.jpg') || project.image.includes('.jpeg')) {
            const imgElement = document.createElement('img');
            imgElement.src = project.image;
            imgElement.alt = project.name;
            imgElement.style.width = '100%';
            imgElement.style.height = '100%';
            imgElement.style.objectFit = 'cover';
            imgElement.style.borderRadius = 'inherit';
            projectImage.appendChild(imgElement);
        } else {
            projectImage.textContent = project.image;
        }
        
        // Crear la información (título + iconos) - FUERA de la tarjeta clickeable
        const projectInfo = document.createElement('div');
        projectInfo.className = 'project-info';
        
        const projectName = document.createElement('h3');
        projectName.className = 'project-name';
        projectName.textContent = project.name;
        
        const projectPlatforms = document.createElement('div');
        projectPlatforms.className = 'project-platforms';
        
        // Filtrar iconos únicos para evitar duplicados
        const uniqueIcons = [];
        const seenIcons = new Set();
        
        project.platforms.forEach(platform => {
            if (!seenIcons.has(platform.icon)) {
                seenIcons.add(platform.icon);
                uniqueIcons.push(platform);
            }
        });
        
        // Mostrar solo iconos únicos como enlaces sin texto
        uniqueIcons.forEach(platform => {
            const link = document.createElement('a');
            link.href = platform.url;
            link.className = 'platform-link';
            link.target = '_blank';
            // Crear título que incluya todos los lugares con ese icono
            const platformsWithSameIcon = project.platforms.filter(p => p.icon === platform.icon);
            const titleText = platformsWithSameIcon.map(p => p.name).join(', ');
            link.title = titleText;
            link.innerHTML = `<i class=\"platform-icon ${platform.icon}\"></i>`;
            projectPlatforms.appendChild(link);
        });
        
        // Ensamblar la estructura
        projectCard.appendChild(projectImage);
        projectInfo.appendChild(projectName);
        projectInfo.appendChild(projectPlatforms);
        
        // El wrapper contiene tanto la tarjeta como la información
        projectWrapper.appendChild(projectCard);
        projectWrapper.appendChild(projectInfo);
        
        grid.appendChild(projectWrapper);
    });
}

// Función para abrir el modal
function openModal(project) {
    // Crear modal si no existe
    let modal = document.getElementById('project-modal');
    if (!modal) {
        modal = createModal();
        document.body.appendChild(modal);
    }
    
    // Actualizar contenido del modal
    updateModalContent(modal, project);
    
    // Mostrar modal
    modal.classList.add('active');
    currentModal = modal;
    
    // Prevenir scroll del body
    document.body.style.overflow = 'hidden';
}

// Función para crear el modal
function createModal() {
    const modal = document.createElement('div');
    modal.id = 'project-modal';
    modal.className = 'modal';
    
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2 class="modal-title"></h2>
                <button class="close-modal" onclick="closeModal()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="modal-image"></div>
                <div class="modal-content-right">
                    <p class="modal-description"></p>
                    <div class="available-section">
                        <h3 class="available-title">Disponible en</h3>
                        <div class="modal-platforms"></div>
                    </div>
                    <div class="screenshots">
                        <h3 class="screenshots-title">Capturas de pantalla</h3>
                        <div class="screenshots-grid"></div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Cerrar modal al hacer clic fuera
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    return modal;
}

// Función para actualizar el contenido del modal
function updateModalContent(modal, project) {
    // Actualizar título
    modal.querySelector('.modal-title').textContent = project.name;
    
    // Actualizar imagen del modal
    const modalImage = modal.querySelector('.modal-image');
    modalImage.innerHTML = ''; // Limpiar contenido anterior
    
    if (project.image.includes('.png') || project.image.includes('.jpg') || project.image.includes('.jpeg')) {
        const imgElement = document.createElement('img');
        imgElement.src = project.image;
        imgElement.alt = project.name;
        imgElement.style.width = '100%';
        imgElement.style.height = '100%';
        imgElement.style.objectFit = 'contain';
        imgElement.style.borderRadius = 'inherit';
        modalImage.appendChild(imgElement);
    } else {
        modalImage.textContent = project.image;
    }
    
    // Actualizar descripción
    modal.querySelector('.modal-description').textContent = project.description;
    
    // El título de la sección siempre será "Disponible en"
    const availableTitle = modal.querySelector('.available-title');
    availableTitle.textContent = 'Disponible en';
    
    // Actualizar plataformas/puntos de venta
    const platformsContainer = modal.querySelector('.modal-platforms');
    platformsContainer.innerHTML = '';
    
    project.platforms.forEach(platform => {
        const link = document.createElement('a');
        link.href = platform.url;
        link.className = 'platform-link';
        link.target = '_blank';
        
        // Texto simplificado - solo el nombre de la plataforma/tienda
        link.innerHTML = `
            <i class="${platform.icon}"></i>
            <span>${platform.name}</span>
        `;
        platformsContainer.appendChild(link);
    });
    
    // Actualizar capturas
    const screenshotsGrid = modal.querySelector('.screenshots-grid');
    screenshotsGrid.innerHTML = '';
    
    // Filtrar solo las imágenes reales para el modal de imagen
    const imageScreenshots = project.screenshots.filter(screenshot => 
        screenshot.includes('.jpg') || screenshot.includes('.png') || screenshot.includes('.jpeg')
    );
    
    project.screenshots.forEach((screenshot, index) => {
        const screenshotElement = document.createElement('div');
        screenshotElement.className = 'screenshot';
        
        // Verificar si el screenshot es una imagen real o un emoji
        if (screenshot.includes('.jpg') || screenshot.includes('.png') || screenshot.includes('.jpeg')) {
            const imgElement = document.createElement('img');
            imgElement.src = screenshot;
            imgElement.alt = `Captura ${index + 1} de ${project.name}`;
            imgElement.style.width = '100%';
            imgElement.style.height = '100%';
            imgElement.style.objectFit = 'cover';
            imgElement.style.borderRadius = 'inherit';
            imgElement.style.cursor = 'pointer';
            
            // Añadir evento para ver la imagen en modal completo
            imgElement.onclick = (e) => {
                e.stopPropagation(); // Evitar que se cierre el modal principal
                const imageIndex = imageScreenshots.indexOf(screenshot);
                openImageModal(imageScreenshots, imageIndex, project.name);
            };
            
            screenshotElement.appendChild(imgElement);
        } else {
            screenshotElement.textContent = screenshot;
        }
        
        screenshotsGrid.appendChild(screenshotElement);
    });
}

// Función para abrir el modal de imagen completa
function openImageModal(images, startIndex, projectName) {
    // Crear modal de imagen si no existe
    let imageModal = document.getElementById('image-modal');
    if (!imageModal) {
        imageModal = createImageModal();
        document.body.appendChild(imageModal);
    }
    
    // Configurar variables globales
    currentProjectImages = images;
    currentImageIndex = startIndex;
    
    // Actualizar contenido del modal
    updateImageModalContent(imageModal, projectName);
    
    // Mostrar modal
    imageModal.classList.add('active');
    currentImageModal = imageModal;
}

// Función para crear el modal de imagen
function createImageModal() {
    const imageModal = document.createElement('div');
    imageModal.id = 'image-modal';
    imageModal.className = 'image-modal';
    
    imageModal.innerHTML = `
        <div class="image-modal-content">
            <button class="image-modal-close" onclick="closeImageModal()">&times;</button>
            <img src="" alt="">
            <div class="image-modal-nav-group">
                <button class="image-modal-nav image-modal-prev" onclick="previousImage()">&#8249;</button>
                <button class="image-modal-nav image-modal-next" onclick="nextImage()">&#8250;</button>
            </div>
            <div class="image-modal-info"></div>
        </div>
    `;
    
    // Cerrar modal al hacer clic en el fondo
    imageModal.addEventListener('click', (e) => {
        if (e.target === imageModal) {
            closeImageModal();
        }
    });
    
    return imageModal;
}

// Función para actualizar el contenido del modal de imagen
function updateImageModalContent(imageModal, projectName) {
    const img = imageModal.querySelector('.image-modal img');
    const info = imageModal.querySelector('.image-modal-info');
    const prevBtn = imageModal.querySelector('.image-modal-prev');
    const nextBtn = imageModal.querySelector('.image-modal-next');
    
    // Actualizar imagen actual
    img.src = currentProjectImages[currentImageIndex];
    img.alt = `Captura ${currentImageIndex + 1} de ${projectName}`;
    
    // Actualizar información
    info.textContent = `${currentImageIndex + 1} de ${currentProjectImages.length} - ${projectName}`;
    
    // Mostrar/ocultar botones de navegación
    if (currentProjectImages.length <= 1) {
        prevBtn.classList.add('hidden');
        nextBtn.classList.add('hidden');
    } else {
        prevBtn.classList.remove('hidden');
        nextBtn.classList.remove('hidden');
        
        // Deshabilitar botones en los extremos
        prevBtn.style.opacity = currentImageIndex === 0 ? '0.5' : '1';
        nextBtn.style.opacity = currentImageIndex === currentProjectImages.length - 1 ? '0.5' : '1';
    }
}

// Función para ir a la imagen anterior
function previousImage() {
    if (currentImageIndex > 0) {
        currentImageIndex--;
        updateImageModalContent(currentImageModal, getCurrentProjectName());
    }
}

// Función para ir a la siguiente imagen
function nextImage() {
    if (currentImageIndex < currentProjectImages.length - 1) {
        currentImageIndex++;
        updateImageModalContent(currentImageModal, getCurrentProjectName());
    }
}

// Función auxiliar para obtener el nombre del proyecto actual
function getCurrentProjectName() {
    const modalTitle = document.querySelector('.modal-title');
    return modalTitle ? modalTitle.textContent : 'Proyecto';
}

// Función para cerrar el modal de imagen
function closeImageModal() {
    if (currentImageModal) {
        currentImageModal.classList.remove('active');
        currentImageModal = null;
        currentProjectImages = [];
        currentImageIndex = 0;
    }
}

// Función para cerrar el modal principal
function closeModal() {
    if (currentModal) {
        currentModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        currentModal = null;
    }
}

// Cerrar modals con tecla Escape y navegación con flechas
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (currentImageModal) {
            closeImageModal();
        } else if (currentModal) {
            closeModal();
        }
    }
    
    // Navegación con flechas en el modal de imagen
    if (currentImageModal) {
        if (e.key === 'ArrowLeft') {
            previousImage();
        } else if (e.key === 'ArrowRight') {
            nextImage();
        }
    }
});

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    renderProjects();
});

// También renderizar si el script se carga después
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderProjects);
} else {
    renderProjects();
}
