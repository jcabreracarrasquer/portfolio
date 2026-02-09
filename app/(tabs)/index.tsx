import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Image,
  Linking,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  useWindowDimensions
} from 'react-native';

// --- TUS IMÁGENES ---
const profileCutout = require('../../assets/images/profile.png'); 
const bannerImg = require('../../assets/images/banner.png'); 
const fragatinaImg = require('../../assets/images/fragatina/fragatina.png'); 
const bagonImg = require('../../assets/images/bagon/bagon.jpg');
const acbpImg = require('../../assets/images/acbp/acbp.png');
const ikeaImg = require('../../assets/images/ikea/ikeaportada.jpg'); 
const mixImg = require('../../assets/images/mix/banfner.png');  
const beyondImg = require('../../assets/images/beyond/BeyondRealityLogo1.png'); 

// --- LISTA DE SOFTWARES ---
const SOFTWARES = [
  { id: 1, name: "Photoshop", image: require('../../assets/images/softwares/ps.png') },
  { id: 2, name: "Illustrator", image: require('../../assets/images/softwares/ai.png') },
  { id: 3, name: "Figma", image: require('../../assets/images/softwares/figma.png') },
  { id: 4, name: "Maya", image: require('../../assets/images/softwares/maya.png') },
  { id: 5, name: "ZBrush", image: require('../../assets/images/softwares/zbrush.png') },
  { id: 6, name: "Substance", image: require('../../assets/images/softwares/pt.png') },
  { id: 7, name: "Premiere", image: require('../../assets/images/softwares/pr.png') },
];

// --- GALERÍAS DETALLADAS ---
const GALLERY = {
  fragatina: [
    require('../../assets/images/fragatina/fragatina_1.png'),
    require('../../assets/images/fragatina/fragatina_2.png'),
    require('../../assets/images/fragatina/fragatina_3.png'),
    require('../../assets/images/fragatina/fragatina_4.png'),
    require('../../assets/images/fragatina/fragatina_5.png'),
    require('../../assets/images/fragatina/fragatina_6.png'),
    require('../../assets/images/fragatina/fragatina_7.png'),
    require('../../assets/images/fragatina/fragatina_8.png'),
    require('../../assets/images/fragatina/fragatina_9.png'),
    require('../../assets/images/fragatina/fragatina_10.jpg'),
    require('../../assets/images/fragatina/fragatina_11.png'),
    require('../../assets/images/fragatina/fragatina_12.png'),
    require('../../assets/images/fragatina/fragatina_13.png'),
    require('../../assets/images/fragatina/fragatina_14.png'),
  ],
  bagon: [
    require('../../assets/images/bagon/bagon_2.png'),
    require('../../assets/images/bagon/bagon_1.jpg'),
    bagonImg,
    require('../../assets/images/bagon/bagon_3.png'),
    require('../../assets/images/bagon/bagon_4.jpg'),
  ],
  acbp: [
    acbpImg,
    require('../../assets/images/acbp/acbp1.png'),
    require('../../assets/images/acbp/acbp2.png'),
    require('../../assets/images/acbp/acbp3.png'),
  ],
  ikea: [
    require('../../assets/images/ikea/ikea1.png'),
    require('../../assets/images/ikea/ikea2.png'),
    require('../../assets/images/ikea/ikea3.png'),
    require('../../assets/images/ikea/ikea4.png'),
    require('../../assets/images/ikea/ikea5.png'),
  ],
  mix: [
    require('../../assets/images/mix/Neymar.png'),
    require('../../assets/images/mix/RacingZgz.png'),
    require('../../assets/images/mix/RMatchdayLeganes.png'),
    require('../../assets/images/mix/Fichaje2.png'),
    require('../../assets/images/mix/DaniSefe.png'),
    require('../../assets/images/mix/v2.png'),
    require('../../assets/images/mix/ZaragozaAlbacete.jpg'),
    require('../../assets/images/mix/QuevedoAlbum.jpg'),
    require('../../assets/images/mix/LamineYamalJC.png'),
    require('../../assets/images/mix/golZgzHuesca.png'),
    require('../../assets/images/mix/francho.png'),
    require('../../assets/images/mix/bazdarMatchday.png'),
    require('../../assets/images/mix/ejemplo3.jpg'),
    require('../../assets/images/mix/camiSantos.png'),
  ],
  // Placeholder para la galería del juego
  beyond: [
    beyondImg,
    require('../../assets/images/beyond/captura.png'),
    require('../../assets/images/beyond/captura2.png'),
    require('../../assets/images/beyond/captura3.png'),
    require('../../assets/images/beyond/captura4.png'),
    require('../../assets/images/beyond/captura5.png'),
    require('../../assets/images/beyond/DA2.jpg.png'),
    require('../../assets/images/beyond/DA3.jpg.png'),
    require('../../assets/images/beyond/DA4.jpg.png'),
    require('../../assets/images/beyond/dardo2.png'),
    require('../../assets/images/beyond/estanteria1.png'),
    require('../../assets/images/beyond/estanteria2.png'),
    require('../../assets/images/beyond/estanteria3.png'),
    require('../../assets/images/beyond/Planta.png'),
    require('../../assets/images/beyond/Reloj.png'),
    require('../../assets/images/beyond/Billar.png'),
    require('../../assets/images/beyond/Cuadro.png'),
    require('../../assets/images/beyond/Dardos.png'),
    require('../../assets/images/beyond/Estantería.png'),
  ]
};

// --- IMÁGENES CARRUSEL ---
const CAROUSEL_IMAGES = [
  ...GALLERY.fragatina.slice(0, 5),
  ...GALLERY.bagon.slice(0, 3),
  ...GALLERY.mix.slice(0, 5),
  ...GALLERY.ikea.slice(0, 3),
].sort(() => Math.random() - 0.5);

const COLORS = {
  background: '#050505', 
  cardBg: '#101010',
  accent: '#00D4FF',     
  textTitle: '#FFFFFF',
  textBody: '#A0A0A0',   
  border: 'rgba(0, 212, 255, 0.3)',
  modalBg: '#000000', 
};

// --- BASE DE DATOS PROYECTOS ---
const PROJECTS = [
  {
    id: 6, // Nuevo ID
    title: "Beyond Reality",
    category: "GAME ART & UX/UI",
    image: beyondImg, // Asegúrate de poner la foto real aquí
    desc: "Videojuego cooperativo sobre percepción. Arte 3D/2D, UX/UI y Diseño.",
    fullDesc: "Videojuego cooperativo desarrollado en Unity que explora los límites entre realidad e ilusión. Me encargué de la propuesta gráfica, modelado de objetos 3D y habitaciones, así como el diseño UX/UI. Mecánicas de generación procedural y análisis perceptivo.",
    gallery: GALLERY.beyond,
  },
  {
    id: 1,
    title: "Peña Fragatina",
    category: "BRANDING Y DISEÑO DEPORTIVO",
    image: fragatinaImg,
    desc: "Diseño de identidad, cartelería y estrategia visual para redes sociales.",
    fullDesc: "Desarrollo completo de la identidad visual de Peña Fragatina CF. Diseñando todo tipo de publicaciones para redes sociales (Carteles de partido, matchdays, eventos especiales, etc.)",
    gallery: GALLERY.fragatina,
    videoUrl: null
  },
  {
    id: 2,
    title: "Graphic Playground",
    category: "DISEÑOS VARIADOS",
    image: mixImg,
    desc: "Colección de proyectos variados: Cartelería, fútbol y moda.",
    fullDesc: "Diferentes trabajos gráficos que he ido realizando. Desde cartelería de eventos hasta diseño de moda y contenido deportivo.",
    gallery: GALLERY.mix,
    videoUrl: null
  },
  {
    id: 3,
    title: "Anuncio IKEA (No Oficial)",
    category: "PRODUCCIÓN Y EDICIÓN",
    image: ikeaImg, 
    desc: "Dirección creativa, producción y edición de spot publicitario.",
    fullDesc: "Producción integral inspirada en el estilo publicitario de IKEA. Nos encargamos de la dirección creativa, la planificación del set y la producción audiovisual.",
    gallery: GALLERY.ikea,
    videoUrl: "https://www.youtube.com/watch?v=kqduFN6LFmk" 
  },
  {
    id: 4,
    title: "Pokémon Bagon",
    category: "MODELADO 3D",
    image: bagonImg,
    desc: "Modelado Low-Poly y High-Poly, retopología y texturizado PBR.",
    fullDesc: "Proyecto de modelado de personajes realizado en Maya (Low-Poly), esculpido en ZBrush (High-Poly) y texturizado en Substance Painter.",
    gallery: GALLERY.bagon,
    videoUrl: null
  },
  {
    id: 5,
    title: "ACBP",
    category: "DISEÑO UX/UI",
    image: acbpImg,
    desc: "Diseño de interfaces para programas y diseño de manuales corporativos.",
    fullDesc: "Diseños UX/UI para programas y aplicaciones de la empresa. Se desarrollaron pantallas visuales completas y un manual de identidad corporativa.",
    gallery: GALLERY.acbp,
  }
];

// --- COMPONENTES AUXILIARES ---
const SocialButton = ({ title, url }: { title: string, url: string }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  return (
    <Pressable onPress={() => Linking.openURL(url)}
      // @ts-ignore
      onHoverIn={() => Animated.spring(scaleAnim, { toValue: 1.05, useNativeDriver: Platform.OS !== 'web' }).start()} 
      onHoverOut={() => Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: Platform.OS !== 'web' }).start()}
    >
      <Animated.View style={[styles.heroButton, { transform: [{ scale: scaleAnim }] }]}>
        <Text style={styles.heroButtonText}>{title}</Text>
      </Animated.View>
    </Pressable>
  );
};

const SoftwareItem = ({ image }: { image: any }) => (
  <View style={styles.softwareItem}>
    <Image source={image} style={styles.softwareIcon} resizeMode="contain" />
  </View>
);

const MarqueeGallery = ({ onOpenImage }: { onOpenImage: (img: any) => void }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const imageWidth = 200; 
  const gap = 15; 
  const totalWidth = (imageWidth + gap) * CAROUSEL_IMAGES.length;

  useEffect(() => {
    if (totalWidth > 0) startAnimation();
  }, [totalWidth]);

  const startAnimation = () => {
    scrollX.setValue(0);
    Animated.loop(
      Animated.timing(scrollX, { toValue: -totalWidth, duration: 60000, easing: Easing.linear, useNativeDriver: true })
    ).start();
  };

  return (
    <View style={styles.marqueeContainer}>
      <Animated.View style={[styles.marqueeTrack, { transform: [{ translateX: scrollX }] }]}>
        {[...CAROUSEL_IMAGES, ...CAROUSEL_IMAGES].map((img, index) => (
          <Pressable key={index} style={styles.marqueeItem} onPress={() => onOpenImage(img)}>
            <Image source={img} style={styles.marqueeImage} resizeMode="cover" />
          </Pressable>
        ))}
      </Animated.View>
    </View>
  );
};

// --- FEATURED SLIDER ---
const FeaturedSlider = ({ onOpenProject }: { onOpenProject: (project: any) => void }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const wheelAnim = useRef(new Animated.Value(0)).current; 
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  useEffect(() => {
    wheelAnim.setValue(0);
    Animated.timing(wheelAnim, {
      toValue: 1,
      duration: 700,
      easing: Easing.out(Easing.back(1.2)),
      useNativeDriver: true,
    }).start();
  }, [activeIndex]);

  const rotateY = wheelAnim.interpolate({ inputRange: [0, 1], outputRange: ['75deg', '0deg'] });
  const scale = wheelAnim.interpolate({ inputRange: [0, 1], outputRange: [0.85, 1] });
  const opacity = wheelAnim.interpolate({ inputRange: [0, 0.4, 1], outputRange: [0, 1, 1] });
  const textOpacity = wheelAnim.interpolate({ inputRange: [0, 0.6, 1], outputRange: [0, 0, 1] });

  const handleNext = () => setActiveIndex((prev) => (prev + 1) % PROJECTS.length);
  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length);

  const activeProject = PROJECTS[activeIndex];
  const prevProject = PROJECTS[(activeIndex - 1 + PROJECTS.length) % PROJECTS.length];
  const nextProject = PROJECTS[(activeIndex + 1) % PROJECTS.length];

  return (
    <View style={styles.sliderContainer}>
      <Text style={styles.sliderSectionTitle}>DESTACADOS</Text>
      <View style={styles.sliderContent}>
        {!isMobile && (
          <Pressable onPress={handlePrev} style={styles.sidePreview}>
            <Image source={prevProject.image} style={styles.sideImage} resizeMode="cover" blurRadius={3} />
            <View style={styles.overlayDim} />
            <Text style={styles.arrowText}>‹</Text>
          </Pressable>
        )}
        <View style={styles.activeSlideWrapper}> 
          <Animated.View style={[styles.activeSlide, { 
              opacity: opacity, 
              transform: [{ perspective: 1000 }, { rotateY: rotateY }, { scale: scale }] 
          }]}>
            <Pressable onPress={() => onOpenProject(activeProject)} style={{width: '100%', height: '100%'}}>
               <Image source={activeProject.image} style={styles.activeImage} resizeMode="cover" />
            </Pressable>
          </Animated.View>
          <Animated.View style={[styles.infoContainer, { opacity: textOpacity }]}>
             <Text style={styles.slideTitle}>{activeProject.title}</Text>
             <Text style={styles.slideCategory}>{activeProject.category}</Text>
          </Animated.View>
          {isMobile && (
            <>
              <Pressable onPress={handlePrev} style={[styles.mobileArrow, { left: 0 }]}>
                <Text style={styles.arrowText}>‹</Text>
              </Pressable>
              <Pressable onPress={handleNext} style={[styles.mobileArrow, { right: 0 }]}>
                <Text style={styles.arrowText}>›</Text>
              </Pressable>
            </>
          )}
        </View>
        {!isMobile && (
          <Pressable onPress={handleNext} style={styles.sidePreview}>
            <Image source={nextProject.image} style={styles.sideImage} resizeMode="cover" blurRadius={3} />
            <View style={styles.overlayDim} />
            <Text style={styles.arrowText}>›</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

const GridImage = ({ img, onPress, isMobile }: { img: any, onPress: () => void, isMobile: boolean }) => {
  const [isHovered, setIsHovered] = useState(false);
  const opacityAnim = useRef(new Animated.Value(0.7)).current;
  const handleHoverIn = () => { setIsHovered(true); Animated.timing(opacityAnim, { toValue: 1, duration: 200, useNativeDriver: true }).start(); };
  const handleHoverOut = () => { setIsHovered(false); Animated.timing(opacityAnim, { toValue: 0.7, duration: 200, useNativeDriver: true }).start(); };

  return (
    <Pressable onPress={onPress} style={[styles.gridItemWrapper, { width: isMobile ? '48%' : '32%' }]}
      // @ts-ignore
      onHoverIn={handleHoverIn} onHoverOut={handleHoverOut}
    >
      <Animated.View style={[styles.gridItem, { opacity: opacityAnim, borderColor: isHovered ? COLORS.accent : 'transparent', borderWidth: 2, transform: [{ scale: isHovered ? 1.02 : 1 }] }]}>
        <Image source={img} style={styles.gridImage} resizeMode="cover" />
        {isHovered && <View style={styles.overlayIcon}><Text style={{fontSize: 20}}>🔍</Text></View>}
      </Animated.View>
    </Pressable>
  );
};

const ProjectCard = ({ item, onPress }: { item: any, onPress: () => void }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [isHovered, setIsHovered] = useState(false);
  const { width } = useWindowDimensions();
  const isMobile = width < 768; 
  
  // Ancho dinámico: 100% en móvil, 48% en desktop (para 2 columnas)
  const cardWidth = isMobile ? '100%' : '48%';

  return (
    <Pressable 
      onPress={onPress} 
      style={{ marginBottom: 30, width: cardWidth }}
      // @ts-ignore
      onHoverIn={() => { setIsHovered(true); Animated.timing(scaleAnim, { toValue: 1.02, duration: 200, useNativeDriver: false }).start(); }}
      onHoverOut={() => { setIsHovered(false); Animated.timing(scaleAnim, { toValue: 1, duration: 200, useNativeDriver: false }).start(); }}
    >
      <Animated.View style={[styles.cardDesktopRow, { // Usamos un estilo unificado pero flexible
          flexDirection: 'column', // Imagen arriba, texto abajo
          height: 380, // Altura fija para que queden iguales
          transform: [{ scale: scaleAnim }], 
          borderColor: isHovered ? COLORS.accent : 'rgba(255,255,255,0.1)', 
          shadowOpacity: isHovered ? 0.2 : 0 
      }]}>
        <View style={{ width: '100%', height: '65%' }}>
          <View style={styles.categoryBadge}><Text style={styles.categoryText}>{item.category}</Text></View>
          <Image source={item.image} style={styles.projectImage} resizeMode="cover" />
        </View>
        <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
          <Text style={styles.projectTitle}>{item.title}</Text>
          <Text style={styles.projectDesc} numberOfLines={2}>{item.desc}</Text>
          <Text style={[styles.viewMoreText, { opacity: isHovered ? 1 : 0.6, color: COLORS.accent }]}>{isHovered ? "Ver proyecto completo" : "Ver detalles"} ›</Text>
        </View>
      </Animated.View>
    </Pressable>
  );
};

const ProjectModal = ({ project, visible, onClose }: { project: any, visible: boolean, onClose: () => void }) => {
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  if (!project) return null;

  return (
    <>
      <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
        <View style={styles.modalContainer}>
          <Pressable onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>✕</Text>
          </Pressable>

          <ScrollView contentContainerStyle={styles.modalScroll}>
            <View style={styles.modalContent}>
              <Text style={styles.modalCategory}>{project.category}</Text>
              <Text style={styles.modalTitle}>{project.title}</Text>
              <Text style={styles.modalDesc}>{project.fullDesc}</Text>

              {project.videoUrl && (
                <Pressable style={styles.videoButton} onPress={() => Linking.openURL(project.videoUrl)}>
                  <Text style={styles.videoButtonText}>▶  VER VIDEO EN YOUTUBE</Text>
                </Pressable>
              )}
              
              <View style={styles.separator} />
              <Text style={styles.galleryTitle}>GALERÍA</Text>
              
              <View style={styles.gridContainer}>
                {project.gallery.map((img: any, index: number) => (
                  <GridImage key={index} img={img} isMobile={isMobile} onPress={() => setSelectedImage(img)} />
                ))}
              </View>

              <Pressable onPress={onClose} style={styles.bottomCloseButton}>
                <Text style={styles.bottomCloseText}>Cerrar Proyecto</Text>
              </Pressable>
            </View>
          </ScrollView>
        </View>
      </Modal>

      {selectedImage && (
        <Modal animationType="fade" transparent={true} visible={true} onRequestClose={() => setSelectedImage(null)}>
          <View style={styles.lightboxContainer}>
            <TouchableWithoutFeedback onPress={() => setSelectedImage(null)}><View style={styles.lightboxBackdrop} /></TouchableWithoutFeedback>
            <Image source={selectedImage} style={styles.lightboxImage} resizeMode="contain" />
            <Pressable onPress={() => setSelectedImage(null)} style={styles.lightboxCloseBtn}><Text style={styles.lightboxCloseText}>Cerrar</Text></Pressable>
          </View>
        </Modal>
      )}
    </>
  );
};

export default function PortfolioScreen() {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [marqueeLightboxImg, setMarqueeLightboxImg] = useState<any>(null);
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* HERO */}
        <View style={styles.splitHeroContainer}>
          <View style={[styles.heroContentConstraint, { flexDirection: isMobile ? 'column' : 'row' }]}>
            <View style={styles.heroLeftCol}>
              <Text style={styles.heroIntro}>👋 Hola! Soy Jorge,</Text>
              <Text style={styles.heroTitleGradient}>Diseñador</Text>
              <Text style={styles.heroTitleWhite}>Multimedia</Text>
              <Text style={styles.heroDescription}>
                Especializado en identidad visual, modelado 3D y experiencias de usuario.
                Transformo ideas en realidades visuales.
              </Text>
              <View style={styles.heroActions}>
                 <SocialButton title="Ver LinkedIn" url="https://linkedin.com/in/jorge-cabrera-carrasquer-6bb2b6380/" />
                 <SocialButton title="Instagram" url="https://instagram.com/jcabreradesign/" />
              </View>
            </View>
            <View style={[styles.heroRightCol, { height: isMobile ? 250 : 350 }]}>
               <View style={styles.glowBackground} />
               <Image source={profileCutout} style={styles.heroImage} resizeMode="contain" />
            </View>
          </View>
        </View>

        {/* SOFTWARES */}
        <View style={styles.softwareSection}>
          <Text style={styles.softwareTitle}>SOFTWARES</Text>
          <View style={styles.softwareGrid}>
            {SOFTWARES.map((sw) => (
              <SoftwareItem key={sw.id} image={sw.image} />
            ))}
          </View>
        </View>

        {/* CARRUSEL INFINITO */}
        <MarqueeGallery onOpenImage={setMarqueeLightboxImg} />

        {/* SLIDER DESTACADOS */}
        <FeaturedSlider onOpenProject={setSelectedProject} />

        {/* LISTA PROYECTOS (2 COLUMNAS) */}
        <View style={styles.projectsSection}>
          <Text style={styles.sectionTitle}>TODOS LOS TRABAJOS</Text> 
          <View style={styles.projectsGrid}>
            {PROJECTS.map((project) => (
              <ProjectCard key={project.id} item={project} onPress={() => setSelectedProject(project)} />
            ))}
          </View>
        </View>
        
        <View style={styles.footer}>
          <Text style={styles.quote}>"Design is thinking made visual"</Text>
          <Text style={styles.quoteAuthor}>— Saul Bass</Text>
          <View style={styles.separatorSmall} />
          <Text style={styles.footerText}>jcabreracarrasquer@gmail.com</Text>
          <Text style={styles.footerText}>© 2025 Jorge Cabrera. All Rights Reserved.</Text>
        </View>

      </ScrollView>

      <ProjectModal project={selectedProject} visible={selectedProject !== null} onClose={() => setSelectedProject(null)} />

      {marqueeLightboxImg && (
        <Modal animationType="fade" transparent={true} visible={true} onRequestClose={() => setMarqueeLightboxImg(null)}>
          <View style={styles.lightboxContainer}>
            <TouchableWithoutFeedback onPress={() => setMarqueeLightboxImg(null)}><View style={styles.lightboxBackdrop} /></TouchableWithoutFeedback>
            <Image source={marqueeLightboxImg} style={styles.lightboxImage} resizeMode="contain" />
            <Pressable onPress={() => setMarqueeLightboxImg(null)} style={styles.lightboxCloseBtn}><Text style={styles.lightboxCloseText}>Cerrar</Text></Pressable>
          </View>
        </Modal>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scrollContent: { paddingBottom: 60 },
  
  // HERO
  splitHeroContainer: { backgroundColor: COLORS.background, borderBottomWidth: 1, borderBottomColor: '#222', alignItems: 'center', paddingTop: 30, paddingBottom: 0 },
  heroContentConstraint: { maxWidth: 1100, width: '100%', paddingHorizontal: 40, alignItems: 'center', justifyContent: 'space-between' },
  heroLeftCol: { flex: 1, alignItems: 'flex-start', paddingBottom: 20, paddingRight: 20, zIndex: 10 },
  heroIntro: { color: COLORS.accent, fontSize: 18, fontWeight: 'bold', marginBottom: 10, letterSpacing: 1 },
  heroTitleGradient: { fontSize: 55, fontWeight: '900', color: COLORS.accent, textShadowColor: 'rgba(0, 212, 255, 0.5)', textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 20, letterSpacing: -1, lineHeight: 60 },
  heroTitleWhite: { fontSize: 55, fontWeight: '900', color: '#FFFFFF', letterSpacing: -1, marginBottom: 20, lineHeight: 60 },
  heroDescription: { color: '#aaa', fontSize: 16, lineHeight: 24, maxWidth: 400, marginBottom: 30 },
  heroActions: { flexDirection: 'row', gap: 15 },
  heroButton: { paddingVertical: 12, paddingHorizontal: 28, borderWidth: 1, borderColor: '#fff', borderRadius: 50, backgroundColor: 'rgba(255,255,255,0.05)' },
  heroButtonText: { color: '#fff', fontWeight: 'bold' },
  heroRightCol: { flex: 1, width: '100%', maxWidth: 500, alignItems: 'center', justifyContent: 'flex-end', position: 'relative' },
  heroImage: { width: '100%', height: '100%', zIndex: 2 },
  glowBackground: { position: 'absolute', bottom: 50, width: 300, height: 300, backgroundColor: 'rgba(0, 212, 255, 0.15)', borderRadius: 150, zIndex: 1 },

  // SOFTWARE
  softwareSection: { paddingVertical: 40, backgroundColor: '#0A0A0A', alignItems: 'center', borderBottomWidth: 0 },
  softwareTitle: { color: '#666', fontSize: 12, letterSpacing: 2, marginBottom: 30, fontWeight: 'bold' },
  softwareGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 20, maxWidth: 800 },
  softwareItem: { width: 60, height: 60, borderRadius: 12, backgroundColor: '#151515', alignItems: 'center', justifyContent: 'center' },
  softwareIcon: { width: '60%', height: '60%', opacity: 0.9 },

  // MARQUEE
  marqueeContainer: { height: 150, backgroundColor: '#0A0A0A', overflow: 'hidden', borderBottomWidth: 1, borderBottomColor: '#222', justifyContent: 'center', marginBottom: 20 },
  marqueeTrack: { flexDirection: 'row', alignItems: 'center' },
  marqueeItem: { width: 200, height: 120, marginRight: 15, borderRadius: 8, overflow: 'hidden', backgroundColor: '#222' },
  marqueeImage: { width: '100%', height: '100%', opacity: 0.8 },

  // SLIDER
  sliderContainer: { height: 420, width: '100%', marginBottom: 40, alignItems: 'center', justifyContent: 'center' },
  sliderSectionTitle: { fontSize: 12, color: '#666', marginBottom: 20, fontWeight: 'bold', letterSpacing: 2, textTransform: 'uppercase' },
  sliderContent: { flexDirection: 'row', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  sidePreview: { width: '15%', height: '50%', alignItems: 'center', justifyContent: 'center', opacity: 0.4 },
  sideImage: { width: '100%', height: '100%', borderRadius: 8 },
  overlayDim: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.7)', borderRadius: 8 },
  arrowText: { fontSize: 40, color: '#fff', fontWeight: 'bold', zIndex: 10 },
  activeSlideWrapper: { width: '60%', height: '100%', alignItems: 'center', justifyContent: 'center', zIndex: 10 },
  activeSlide: { width: '100%', height: 220, shadowColor: '#000', shadowOffset: {width:0, height:10}, shadowOpacity: 0.5, shadowRadius: 20, marginBottom: 20 },
  activeImage: { width: '100%', height: '100%', borderRadius: 12 },
  infoContainer: { alignItems: 'center' },
  slideTitle: { color: '#fff', fontSize: 24, fontWeight: '800', textTransform: 'uppercase', marginBottom: 5, textAlign: 'center' },
  slideCategory: { color: '#888', fontSize: 10, letterSpacing: 2 },
  mobileArrow: { position: 'absolute', top: '35%', padding: 15, backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 30, zIndex: 20 },

  // PROJECTS LIST (2 COLUMNAS)
  projectsSection: { padding: 20, maxWidth: 1100, alignSelf: 'center', width: '100%', marginTop: 20 },
  projectsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }, // GRID CONTAINER
  sectionTitle: { fontSize: 12, color: '#666', marginBottom: 30, fontWeight: 'bold', letterSpacing: 2 },
  
  // Cards (Re-used styles)
  cardDesktopRow: { backgroundColor: COLORS.cardBg, borderRadius: 12, overflow: 'hidden', borderWidth: 1, shadowColor: COLORS.accent, shadowOffset: { width: 0, height: 5 }, shadowRadius: 15 },
  cardMobile: { backgroundColor: COLORS.cardBg, borderRadius: 12, overflow: 'hidden', borderWidth: 1 },
  imageWrapperDesktop: { width: 240, height: '100%' },
  imageWrapperMobile: { width: '100%', height: 200 },
  projectImage: { width: '100%', height: '100%' },
  categoryBadge: { position: 'absolute', top: 15, left: 15, backgroundColor: 'rgba(0,0,0,0.8)', paddingVertical: 4, paddingHorizontal: 10, borderRadius: 4, zIndex: 10, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  categoryText: { color: COLORS.accent, fontSize: 9, fontWeight: 'bold', letterSpacing: 1 },
  cardContent: { flex: 1, padding: 25, justifyContent: 'center' },
  projectTitle: { fontSize: 20, fontWeight: '700', color: '#ffffff', marginBottom: 8 },
  projectDesc: { fontSize: 14, color: COLORS.textBody, lineHeight: 20, marginBottom: 15 },
  viewMoreText: { fontWeight: '700', fontSize: 13, letterSpacing: 0.5 },

  // MODAL & GENERAL
  modalContainer: { flex: 1, backgroundColor: 'rgba(0,0,0,0.95)' },
  modalScroll: { padding: 20, paddingBottom: 100 },
  modalContent: { maxWidth: 900, alignSelf: 'center', width: '100%', paddingTop: 60 },
  closeButton: { position: 'absolute', top: 40, right: 30, zIndex: 99, padding: 10, backgroundColor: 'rgba(50,50,50,0.7)', borderRadius: 20 },
  closeButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  modalCategory: { color: COLORS.accent, fontSize: 12, fontWeight: 'bold', letterSpacing: 2, marginBottom: 10 },
  modalTitle: { color: '#fff', fontSize: 32, fontWeight: '800', marginBottom: 20 },
  modalDesc: { color: '#ccc', fontSize: 18, lineHeight: 28, marginBottom: 20 },
  videoButton: { backgroundColor: '#CC0000', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 8, alignSelf: 'flex-start', marginBottom: 30 },
  videoButtonText: { color: '#fff', fontWeight: 'bold', letterSpacing: 1 },
  separator: { height: 1, backgroundColor: '#333', marginBottom: 40 },
  galleryTitle: { color: '#666', fontSize: 14, fontWeight: 'bold', letterSpacing: 2, marginBottom: 20 },
  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  gridItemWrapper: { aspectRatio: 1, marginBottom: 10 },
  gridItem: { width: '100%', height: '100%', borderRadius: 4, overflow: 'hidden', backgroundColor: '#222', justifyContent: 'center', alignItems: 'center' },
  gridImage: { width: '100%', height: '100%' },
  overlayIcon: { position: 'absolute', backgroundColor: 'rgba(0,0,0,0.4)', borderRadius: 20, padding: 5 },
  lightboxContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', zIndex: 1000 },
  lightboxBackdrop: { position: 'absolute', width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.95)' },
  lightboxImage: { width: '90%', height: '80%' },
  lightboxCloseBtn: { position: 'absolute', bottom: 50, paddingVertical: 10, paddingHorizontal: 30, borderWidth: 1, borderColor: '#fff', borderRadius: 30, backgroundColor: 'rgba(0,0,0,0.8)' },
  lightboxCloseText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  bottomCloseButton: { marginTop: 40, padding: 15, borderWidth: 1, borderColor: '#fff', borderRadius: 8, alignItems: 'center', alignSelf: 'center' },
  bottomCloseText: { color: '#fff', fontWeight: 'bold' },
  footer: { padding: 50, alignItems: 'center', borderTopWidth: 1, borderTopColor: '#111', marginTop: 40, backgroundColor: '#080808' },
  quote: { color: '#fff', fontSize: 18, fontStyle: 'italic', marginBottom: 10 },
  quoteAuthor: { color: COLORS.accent, fontSize: 14, fontWeight: 'bold', marginBottom: 20 },
  separatorSmall: { height: 2, width: 40, backgroundColor: '#333', marginBottom: 20 },
  footerText: { color: '#666', fontSize: 12, marginBottom: 5 },
});