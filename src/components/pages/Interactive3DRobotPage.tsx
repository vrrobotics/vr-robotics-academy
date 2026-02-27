import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { RotateCw, ZoomIn, ZoomOut, Move, Info } from 'lucide-react';
import * as THREE from 'three';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RazorpayService from '@/services/razorpayService';

export default function Interactive3DRobotPage() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(5);
  const [showInfo, setShowInfo] = useState(true);

  const handleBookDemoPayment = async () => {
    try {
      await RazorpayService.initiateDemo1DollarPayment(
        (response) => {
          console.log('Demo payment successful:', response);
        },
        (error) => {
          console.error('Demo payment failed:', error);
        }
      );
    } catch (error) {
      console.error('Error initiating demo payment:', error);
    }
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x191919);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      canvasRef.current.clientWidth / canvasRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = zoom;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    canvasRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xd8ff91, 1);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xffd39e, 1);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    // Create bounding box (container for robot)
    const boxGeometry = new THREE.BoxGeometry(3, 4.5, 2.5);
    const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x191919, wireframe: false });
    const boundingBox = new THREE.Mesh(boxGeometry, boxMaterial);
    
    // Add visible edges to the bounding box
    const boxEdges = new THREE.EdgesGeometry(boxGeometry);
    const edgeMaterial = new THREE.LineBasicMaterial({ color: 0xd8ff91, linewidth: 2 });
    const boxWireframe = new THREE.LineSegments(boxEdges, edgeMaterial);
    boundingBox.add(boxWireframe);
    
    scene.add(boundingBox);

    // Create a simple robot (scaled to fit in box)
    const robotGroup = new THREE.Group();
    const scale = 0.65; // Scale factor to fit robot in box

    // Body
    const bodyGeometry = new THREE.BoxGeometry(1.5 * scale, 2 * scale, 1 * scale);
    const bodyMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x363736,
      emissive: 0xd8ff91,
      emissiveIntensity: 0.2
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    robotGroup.add(body);

    // Head
    const headGeometry = new THREE.BoxGeometry(1 * scale, 1 * scale, 1 * scale);
    const headMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x4b4d4b,
      emissive: 0xffd39e,
      emissiveIntensity: 0.2
    });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 1.5 * scale;
    robotGroup.add(head);

    // Eyes
    const eyeGeometry = new THREE.SphereGeometry(0.15 * scale, 16, 16);
    const eyeMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xd8ff91,
      emissive: 0xd8ff91,
      emissiveIntensity: 1
    });
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.25 * scale, 1.6 * scale, 0.5 * scale);
    robotGroup.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.25 * scale, 1.6 * scale, 0.5 * scale);
    robotGroup.add(rightEye);

    // Arms
    const armGeometry = new THREE.BoxGeometry(0.4 * scale, 1.5 * scale, 0.4 * scale);
    const armMaterial = new THREE.MeshPhongMaterial({ color: 0x6d6f6d });
    
    const leftArm = new THREE.Mesh(armGeometry, armMaterial);
    leftArm.position.set(-1 * scale, 0, 0);
    robotGroup.add(leftArm);

    const rightArm = new THREE.Mesh(armGeometry, armMaterial);
    rightArm.position.set(1 * scale, 0, 0);
    robotGroup.add(rightArm);

    // Legs
    const legGeometry = new THREE.BoxGeometry(0.5 * scale, 1.5 * scale, 0.5 * scale);
    const legMaterial = new THREE.MeshPhongMaterial({ color: 0x7f8480 });
    
    const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
    leftLeg.position.set(-0.5 * scale, -1.75 * scale, 0);
    robotGroup.add(leftLeg);

    const rightLeg = new THREE.Mesh(legGeometry, legMaterial);
    rightLeg.position.set(0.5 * scale, -1.75 * scale, 0);
    robotGroup.add(rightLeg);

    // Add wireframe outline
    const edges = new THREE.EdgesGeometry(bodyGeometry);
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0xd8ff91 });
    const wireframe = new THREE.LineSegments(edges, lineMaterial);
    body.add(wireframe);

    scene.add(robotGroup);

    // Animation
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      
      robotGroup.rotation.x = rotation.x;
      robotGroup.rotation.y = rotation.y;
      
      // Idle animation
      robotGroup.position.y = Math.sin(Date.now() * 0.001) * 0.1;
      leftArm.rotation.z = Math.sin(Date.now() * 0.002) * 0.2;
      rightArm.rotation.z = -Math.sin(Date.now() * 0.002) * 0.2;

      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!canvasRef.current) return;
      camera.aspect = canvasRef.current.clientWidth / canvasRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      renderer.dispose();
      canvasRef.current?.removeChild(renderer.domElement);
    };
  }, [rotation, zoom]);

  return (
    <>
      <Header />
      <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      {/* Circuit Background */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(90deg, rgba(216, 255, 145, 0.1) 1px, transparent 1px),
            linear-gradient(rgba(216, 255, 145, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Header */}
      <section className="relative py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h1
            className="font-heading text-5xl lg:text-6xl mb-4 text-primary text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              textShadow: '0 0 30px rgba(216, 255, 145, 0.4)'
            }}
          >
            Interactive 3D Robot
          </motion.h1>
          <motion.p
            className="font-paragraph text-xl text-foreground/90 text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Explore our robot in 3D! Use the controls below to interact with the model.
          </motion.p>
        </div>
      </section>

      {/* 3D Canvas */}
      <section className="relative py-8 px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="relative rounded-3xl overflow-hidden"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(216, 255, 145, 0.2)',
              backdropFilter: 'blur(10px)',
              height: '600px'
            }}
          >
            <div ref={canvasRef} className="w-full h-full" />

            {/* Info Overlay */}
            {showInfo && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute top-2 left-2 p-2 rounded-md"
                style={{
                  background: 'rgba(25, 25, 25, 0.9)',
                  border: '1px solid rgba(216, 255, 145, 0.3)',
                  backdropFilter: 'blur(10px)',
                  width: '140px'
                }}
              >
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-heading text-[10px] text-primary">Info</h3>
                  <button onClick={() => setShowInfo(false)} className="text-foreground/50 hover:text-foreground text-xs leading-none">
                    ×
                  </button>
                </div>
                <div className="space-y-0.5 font-paragraph text-[9px] text-foreground/80">
                  <p>• Drag: rotate</p>
                  <p>• Controls: zoom</p>
                  <p>• See animation</p>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Controls */}
      <section className="relative py-8 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            <motion.button
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary/10 border border-primary/30 text-primary font-heading"
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(216, 255, 145, 0.2)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setRotation({ x: 0, y: rotation.y + 0.5 })}
            >
              <RotateCw className="w-5 h-5" />
              Rotate
            </motion.button>

            <motion.button
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary/10 border border-primary/30 text-primary font-heading"
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(216, 255, 145, 0.2)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setZoom(Math.max(3, zoom - 1))}
            >
              <ZoomIn className="w-5 h-5" />
              Zoom In
            </motion.button>

            <motion.button
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary/10 border border-primary/30 text-primary font-heading"
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(216, 255, 145, 0.2)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setZoom(Math.min(10, zoom + 1))}
            >
              <ZoomOut className="w-5 h-5" />
              Zoom Out
            </motion.button>

            <motion.button
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-secondary/10 border border-secondary/30 text-secondary font-heading"
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 211, 158, 0.2)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setRotation({ x: 0, y: 0 });
                setZoom(5);
              }}
            >
              <Move className="w-5 h-5" />
              Reset View
            </motion.button>

            <motion.button
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-secondary/10 border border-secondary/30 text-secondary font-heading"
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 211, 158, 0.2)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowInfo(!showInfo)}
            >
              <Info className="w-5 h-5" />
              {showInfo ? 'Hide' : 'Show'} Info
            </motion.button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="font-heading text-4xl text-center mb-12 text-secondary"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              textShadow: '0 0 30px rgba(255, 211, 158, 0.4)'
            }}
          >
            What You'll Learn
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: '3D Modeling',
                description: 'Learn to design and create 3D models for robots and virtual environments'
              },
              {
                title: 'Programming',
                description: 'Code interactive behaviors and animations for your 3D creations'
              },
              {
                title: 'VR Integration',
                description: 'Experience your creations in immersive virtual reality'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 rounded-2xl text-center"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <h3 className="font-heading text-2xl mb-3 text-foreground">{feature.title}</h3>
                <p className="font-paragraph text-foreground/70">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="p-16 rounded-3xl text-center"
            style={{
              background: 'linear-gradient(135deg, rgba(216, 255, 145, 0.1), rgba(255, 211, 158, 0.1))',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <h2 className="font-heading text-4xl mb-6 text-foreground">
              Ready to Build Your Own Robot?
            </h2>
            <p className="font-paragraph text-xl text-foreground/80 mb-8 max-w-3xl mx-auto">
              Join our academy and learn to create amazing 3D robots and VR experiences!
            </p>
            <motion.button
              className="bg-primary text-primary-foreground font-heading font-semibold px-8 py-4 rounded-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBookDemoPayment}
            >
              Book Demo
            </motion.button>
          </div>
        </div>
      </section>
      </div>
    <Footer />
    </>
  );
}
