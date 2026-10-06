/**
 * 3D cutaway of a nuclear waste management facility.
 *
 * Deliberately hand-built from primitives (boxes, cylinders, spheres) so the
 * scene stays dependency-light, loads fast and needs no model downloads.
 *
 * Layout, top to bottom:
 *   - surface buildings (reactor, pool hall, dry cask farm)
 *   - three geological strata
 *   - a repository level with emplacement tunnels and canisters
 *   - a bentonite-buffered canister shown in cross section
 *
 * Click any group to read about it in the side panel.
 */

import { Suspense, useRef, useState, type ReactNode } from 'react'
import { Canvas, useFrame, type ThreeEvent } from '@react-three/fiber'
import { Html, OrbitControls, RoundedBox } from '@react-three/drei'
import type { Group } from 'three'
import type { SitePartId } from '../data/siteModel'

/* ---------------------------------------------------------------- *
 * Small building blocks
 * ---------------------------------------------------------------- */

function Label({ children, show }: { children: ReactNode; show: boolean }) {
  if (!show) return null
  return (
    <Html center distanceFactor={11} style={{ pointerEvents: 'none' }}>
      <div className="rounded-full border border-plasma/50 bg-abyss/90 px-2 py-0.5 font-mono text-[10px] whitespace-nowrap text-plasma shadow-[0_0_14px_rgba(56,240,255,0.35)]">
        {children}
      </div>
    </Html>
  )
}

/** Wraps a selectable mesh group with hover + selection state. */
function Part({
  id,
  selected,
  onSelect,
  children,
  label,
  showLabels,
}: {
  id: SitePartId
  selected: boolean
  onSelect: (id: SitePartId) => void
  children: ReactNode
  label: string
  showLabels: boolean
}) {
  const ref = useRef<Group>(null)

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    if (selected) ref.current.position.y = Math.sin(t * 2.2) * 0.14
    else ref.current.position.y = 0
  })

  const handle = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation()
    onSelect(id)
  }

  return (
    <group
      ref={ref}
      onClick={handle}
      onPointerOver={(e) => {
        e.stopPropagation()
        document.body.style.cursor = 'pointer'
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'auto'
      }}
    >
      {children}
      <Label show={showLabels}>{label}</Label>
    </group>
  )
}

/* ---------------------------------------------------------------- *
 * Surface
 * ---------------------------------------------------------------- */

function Surface({
  selected,
  onSelect,
  showLabels,
}: {
  selected: SitePartId | null
  onSelect: (id: SitePartId) => void
  showLabels: boolean
}) {
  return (
    <group>
      {/* ground plate */}
      <RoundedBox args={[16, 0.5, 11]} radius={0.12} position={[0, -0.25, 0]}>
        <meshStandardMaterial color="#1b2a1e" roughness={0.95} />
      </RoundedBox>

      {/* Reactor building */}
      <Part
        id="reactor"
        selected={selected === 'reactor'}
        onSelect={onSelect}
        label="Reactor"
        showLabels={showLabels}
      >
        <mesh position={[-5, 1.6, -1.6]}>
          <cylinderGeometry args={[1.7, 1.9, 3.2, 32]} />
          <meshStandardMaterial
            color={selected === 'reactor' ? '#38f0ff' : '#2b3d5c'}
            metalness={0.35}
            roughness={0.5}
            emissive={selected === 'reactor' ? '#0a4a55' : '#000000'}
          />
        </mesh>
        {/* containment dome */}
        <mesh position={[-5, 3.3, -1.6]}>
          <sphereGeometry args={[1.7, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial
            color={selected === 'reactor' ? '#9df7ff' : '#3d5580'}
            metalness={0.4}
            roughness={0.45}
          />
        </mesh>
      </Part>

      {/* Spent fuel pool hall */}
      <Part
        id="pool"
        selected={selected === 'pool'}
        onSelect={onSelect}
        label="Fuel pool"
        showLabels={showLabels}
      >
        <mesh position={[-1, 1.1, -1.6]}>
          <boxGeometry args={[3.4, 2.2, 3]} />
          <meshStandardMaterial
            color={selected === 'pool' ? '#38f0ff' : '#33456a'}
            metalness={0.3}
            roughness={0.6}
          />
        </mesh>
        {/* glowing water */}
        <mesh position={[-1, 2.05, -1.6]}>
          <boxGeometry args={[2.6, 0.3, 2.2]} />
          <meshStandardMaterial
            color="#38f0ff"
            emissive="#38f0ff"
            emissiveIntensity={selected === 'pool' ? 1.6 : 0.75}
            transparent
            opacity={0.85}
          />
        </mesh>
      </Part>

      {/* Dry cask farm */}
      <Part
        id="casks"
        selected={selected === 'casks'}
        onSelect={onSelect}
        label="Dry casks"
        showLabels={showLabels}
      >
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <mesh key={i} position={[3.4 + (i % 3) * 1.5, 1.1, -2.4 + Math.floor(i / 3) * 1.8]}>
            <cylinderGeometry args={[0.5, 0.5, 2.2, 24]} />
            <meshStandardMaterial
              color={selected === 'casks' ? '#38f0ff' : '#4a5f85'}
              metalness={0.55}
              roughness={0.4}
              emissive={selected === 'casks' ? '#0a4a55' : '#000000'}
            />
          </mesh>
        ))}
      </Part>

      {/* surface labels guide line */}
      <mesh position={[0, 0.28, 3.6]} rotation={[0, 0, 0]}>
        <boxGeometry args={[15, 0.06, 0.06]} />
        <meshStandardMaterial color="#38f0ff" emissive="#38f0ff" emissiveIntensity={0.6} />
      </mesh>
    </group>
  )
}

/* ---------------------------------------------------------------- *
 * Geology
 * ---------------------------------------------------------------- */

const STRATA = [
  { y: -2.6, h: 3.2, color: '#3f3a33', name: 'Soil & sediments' },
  { y: -7.5, h: 6.4, color: '#35405c', name: 'Upper bedrock' },
  { y: -15, h: 8.4, color: '#2a3347', name: 'Host granite' },
]

function Geology({
  selected,
  onSelect,
  showLabels,
  ghost,
}: {
  selected: SitePartId | null
  onSelect: (id: SitePartId) => void
  showLabels: boolean
  ghost: boolean
}) {
  const isSel = selected === 'strata'
  return (
    <Part
      id="strata"
      selected={isSel}
      onSelect={onSelect}
      label="Host rock"
      showLabels={showLabels}
    >
      {STRATA.map((s) => (
        <RoundedBox
          key={s.name}
          args={[16, s.h, 11]}
          radius={0.06}
          position={[0, s.y, 0]}
        >
          <meshStandardMaterial
            color={isSel ? '#4a7ba8' : s.color}
            roughness={0.95}
            metalness={0.05}
            transparent={ghost}
            opacity={ghost ? 0.32 : 1}
            depthWrite={!ghost}
          />
        </RoundedBox>
      ))}
      {/* strata tick marks so layers read as distinct */}
      {STRATA.map((s) => (
        <mesh key={`t-${s.name}`} position={[7.6, s.y + s.h / 2 - 0.3, 5.6]}>
          <boxGeometry args={[0.8, 0.06, 0.06]} />
          <meshStandardMaterial color="#6f86a5" />
        </mesh>
      ))}
    </Part>
  )
}

/* ---------------------------------------------------------------- *
 * Repository level
 * ---------------------------------------------------------------- */

function Canister({
  position,
  selected,
}: {
  position: [number, number, number]
  selected: boolean
}) {
  const ref = useRef<Group>(null)
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.clock.elapsedTime * 0.35
  })
  return (
    <group ref={ref} position={position}>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.42, 0.42, 1.7, 28]} />
        <meshStandardMaterial
          color={selected ? '#9df7ff' : '#c08a4a'}
          metalness={0.8}
          roughness={0.32}
          emissive={selected ? '#0a4a55' : '#3a1f00'}
          emissiveIntensity={selected ? 0.9 : 0.45}
        />
      </mesh>
      {/* end caps */}
      {[-0.86, 0.86].map((x) => (
        <mesh key={x} position={[x, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.44, 0.44, 0.08, 28]} />
          <meshStandardMaterial color="#e0b273" metalness={0.85} roughness={0.3} />
        </mesh>
      ))}
    </group>
  )
}

function Repository({
  selected,
  onSelect,
  showLabels,
}: {
  selected: SitePartId | null
  onSelect: (id: SitePartId) => void
  showLabels: boolean
}) {
  const isTunnel = selected === 'tunnel'
  const isBuffer = selected === 'buffer'
  const isCanister = selected === 'canister'

  const galleryY = -15.5
  const zs = [-3.2, 0, 3.2]

  return (
    <group>
      {/* main access tunnel running along X */}
      <Part
        id="tunnel"
        selected={isTunnel}
        onSelect={onSelect}
        label="Access tunnel"
        showLabels={showLabels}
      >
        <mesh position={[0, galleryY, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.95, 0.95, 15, 24, 1, true]} />
          <meshStandardMaterial
            color={isTunnel ? '#38f0ff' : '#55688c'}
            metalness={0.3}
            roughness={0.7}
            side={2}
            emissive={isTunnel ? '#0a4a55' : '#000000'}
          />
        </mesh>

        {/* cross galleries */}
        {zs.map((z) => (
          <mesh key={z} position={[0, galleryY, z]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.8, 0.8, 7, 20, 1, true]} />
            <meshStandardMaterial
              color={isTunnel ? '#38f0ff' : '#4c5f83'}
              metalness={0.3}
              roughness={0.7}
              side={2}
              emissive={isTunnel ? '#0a4a55' : '#000000'}
            />
          </mesh>
        ))}

        {/* clay plug sealing the tunnel mouth */}
        <mesh position={[7.4, galleryY, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.98, 0.98, 0.5, 24]} />
          <meshStandardMaterial color={isBuffer ? '#7c5cff' : '#8a6fd0'} roughness={1} />
        </mesh>
      </Part>

      {/* Bentonite buffers + canisters in the cross galleries */}
      <Part
        id="buffer"
        selected={isBuffer}
        onSelect={onSelect}
        label="Bentonite buffer"
        showLabels={showLabels}
      >
        {zs.flatMap((z) =>
          [-2.2, 0, 2.2].map((x) => (
            <mesh key={`${x}-${z}`} position={[x, galleryY, z]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.62, 0.62, 1.9, 24]} />
              <meshStandardMaterial
                color={isBuffer ? '#7c5cff' : '#5a4b8f'}
                roughness={0.9}
                transparent
                opacity={0.72}
                emissive={isBuffer ? '#2a1a66' : '#000000'}
              />
            </mesh>
          )),
        )}
      </Part>

      <Part
        id="canister"
        selected={isCanister}
        onSelect={onSelect}
        label="Waste canister"
        showLabels={showLabels}
      >
        {zs.flatMap((z) =>
          [-2.2, 0, 2.2].map((x) => (
            <Canister key={`${x}-${z}`} position={[x, galleryY, z]} selected={isCanister} />
          )),
        )}
      </Part>

      {/* Depth ruler down the left edge */}
      <group position={[-7.6, -7, 5.6]}>
        {[0, -6, -12, -18].map((y) => (
          <mesh key={y} position={[0, y, 0]}>
            <boxGeometry args={[1.1, 0.05, 0.05]} />
            <meshStandardMaterial color="#38f0ff" emissive="#38f0ff" emissiveIntensity={0.5} />
          </mesh>
        ))}
        <mesh position={[0, -9, 0]}>
          <boxGeometry args={[0.04, 18, 0.04]} />
          <meshStandardMaterial color="#38f0ff" emissive="#38f0ff" emissiveIntensity={0.4} />
        </mesh>
      </group>
    </group>
  )
}

/* ---------------------------------------------------------------- *
 * Scene
 * ---------------------------------------------------------------- */

function Scene({
  selected,
  onSelect,
  showLabels,
}: {
  selected: SitePartId | null
  onSelect: (id: SitePartId) => void
  showLabels: boolean
}) {
  /* Make the strata transparent while anything underground is selected,
     so the repository level is visible through the rock. */
  const underground = selected === 'tunnel' || selected === 'canister' || selected === 'buffer'

  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[9, 14, 7]} intensity={1.5} color="#dff4ff" />
      <directionalLight position={[-8, 5, -6]} intensity={0.5} color="#7c5cff" />
      <pointLight position={[0, -15, 0]} intensity={22} color="#c08a4a" distance={22} />

      <group position={[0, 1.4, 0]}>
        <Surface selected={selected} onSelect={onSelect} showLabels={showLabels} />
        <Geology
          selected={selected}
          onSelect={onSelect}
          showLabels={showLabels}
          ghost={underground}
        />
        <Repository selected={selected} onSelect={onSelect} showLabels={showLabels} />
      </group>

      <OrbitControls
        enableDamping
        dampingFactor={0.08}
        minPolarAngle={0.3}
        maxPolarAngle={Math.PI / 1.75}
        minDistance={11}
        maxDistance={44}
        target={[0, -4, 0]}
      />
    </>
  )
}

/* ---------------------------------------------------------------- *
 * Canvas wrapper — separate so a failed WebGL context cannot take
 * down the rest of the page.
 * ---------------------------------------------------------------- */

export default function SiteModel({
  selected,
  onSelect,
  showLabels,
}: {
  selected: SitePartId | null
  onSelect: (id: SitePartId | null) => void
  showLabels: boolean
}) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div className="grid h-full min-h-[22rem] place-items-center rounded-xl border border-edge bg-hull/50 p-8 text-center">
        <div>
          <p className="text-2xl">🧊</p>
          <p className="mt-3 text-[0.95rem] font-semibold text-white">3D view unavailable</p>
          <p className="mt-1 max-w-sm text-[0.83rem] text-slate-400">
            This browser could not start a WebGL context. The barrier layers and facility descriptions
            are still available in the list next to the model.
          </p>
        </div>
      </div>
    )
  }

  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [17, 9, 19], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      onCreated={({ gl }) => gl.setClearColor('#04070d', 0)}
      style={{ touchAction: 'none' }}
      onError={() => setFailed(true)}
      fallback={
        <div className="grid h-full place-items-center text-slate-500">Loading 3D model…</div>
      }
    >
      <Suspense fallback={null}>
        <Scene selected={selected} onSelect={(id) => onSelect(id)} showLabels={showLabels} />
      </Suspense>
    </Canvas>
  )
}