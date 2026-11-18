import { ChevronLeft, ChevronRight, Maximize, X, ZoomIn, ZoomOut } from 'lucide-react'
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

export interface GalleryImage {
  src: string
  alt: string
}

interface Props {
  images: GalleryImage[]
  initialIndex: number
  onClose: () => void
}

const toolClass =
  'grid h-10 w-10 shrink-0 place-items-center rounded-lg text-slate-100 hover:bg-white/15 focus-visible:outline-white'

export function ImageLightbox({ images, initialIndex, onClose }: Props) {
  const [index, setIndex] = useState(initialIndex)
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const stageRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const stripRef = useRef<HTMLDivElement>(null)
  const thumbsRef = useRef<Array<HTMLButtonElement | null>>([])
  const dragRef = useRef<{ x: number; y: number; panX: number; panY: number } | null>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  const clampPan = useCallback((x: number, y: number, scale: number) => {
    const stage = stageRef.current
    const image = imageRef.current
    if (!stage || !image) return { x: 0, y: 0 }
    const maxX = Math.max(0, (image.clientWidth * scale - stage.clientWidth) / 2)
    const maxY = Math.max(0, (image.clientHeight * scale - stage.clientHeight) / 2)
    return { x: Math.max(-maxX, Math.min(maxX, x)), y: Math.max(-maxY, Math.min(maxY, y)) }
  }, [])

  const getOriginalScale = useCallback(() => {
    const image = imageRef.current
    if (!image?.naturalWidth) return 1
    const fittedWidth = Number.parseFloat(getComputedStyle(image).width)
    return fittedWidth > 0 ? Math.max(1, image.naturalWidth / fittedWidth) : 1
  }, [])

  const changeZoom = useCallback(
    (next: number) => {
      const scale = Math.max(0.25, Math.min(Math.max(16, getOriginalScale()), next))
      setZoom(scale)
      setPan((current) => clampPan(current.x, current.y, scale))
    },
    [clampPan, getOriginalScale],
  )

  const select = useCallback(
    (next: number) => {
      setIndex((next + images.length) % images.length)
      setZoom(1)
      setPan({ x: 0, y: 0 })
    },
    [images.length],
  )

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    const previousFocus =
      document.activeElement instanceof HTMLElement ? document.activeElement : null
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.body.style.overflow = previousOverflow
      previousFocus?.focus({ preventScroll: true })
    }
  }, [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        select(index - 1)
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault()
        select(index + 1)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [index, onClose, select])

  useLayoutEffect(() => {
    const strip = stripRef.current
    const thumb = thumbsRef.current[index]
    if (!strip || !thumb) return
    const max = strip.scrollWidth - strip.clientWidth
    if (max <= 0) {
      strip.scrollLeft = 0
      return
    }
    if (index === images.length - 1) {
      strip.scrollLeft = max
      return
    }
    const stripBounds = strip.getBoundingClientRect()
    const thumbBounds = thumb.getBoundingClientRect()
    const target =
      strip.scrollLeft +
      thumbBounds.left +
      thumbBounds.width / 2 -
      stripBounds.left -
      stripBounds.width / 2
    strip.scrollLeft = Math.max(0, Math.min(max, target))
  }, [images.length, index])

  const image = images[index]
  return createPortal(
    <div
      className="image-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="이미지 갤러리"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <header className="image-lightbox-toolbar" onClick={(event) => event.stopPropagation()}>
        <span className="text-sm font-semibold text-slate-200" aria-live="polite">
          {index + 1} / {images.length}
        </span>
        <div className="flex items-center gap-1">
          <button
            className={toolClass}
            type="button"
            aria-label="축소"
            onClick={() => changeZoom(zoom / 1.25)}
          >
            <ZoomOut size={21} />
          </button>
          <button
            className={toolClass}
            type="button"
            aria-label="확대"
            onClick={() => changeZoom(zoom * 1.25)}
          >
            <ZoomIn size={21} />
          </button>
          <button
            className={toolClass}
            type="button"
            aria-label="화면 맞춤"
            onClick={() => {
              setZoom(1)
              setPan({ x: 0, y: 0 })
            }}
          >
            <Maximize size={21} />
          </button>
          <button
            className={toolClass}
            type="button"
            aria-label="원본 크기 (100%)"
            onClick={() => changeZoom(getOriginalScale())}
          >
            <span className="text-xs font-bold tracking-tight" aria-hidden="true">
              1:1
            </span>
          </button>
          <button
            className={`${toolClass} ml-1 bg-white/10`}
            type="button"
            aria-label="닫기"
            onClick={onClose}
            ref={closeRef}
          >
            <X size={22} />
          </button>
        </div>
      </header>
      <div
        className="image-lightbox-main"
        onClick={(event) => {
          if (event.target === event.currentTarget) onClose()
        }}
      >
        {images.length > 1 && (
          <button
            className="image-lightbox-arrow"
            type="button"
            aria-label="이전 이미지"
            onClick={() => select(index - 1)}
          >
            <ChevronLeft size={28} />
          </button>
        )}
        <div
          className="image-lightbox-stage"
          ref={stageRef}
          onClick={(event) => {
            if (event.target === event.currentTarget) onClose()
          }}
          onWheel={(event) => {
            event.preventDefault()
            changeZoom(zoom * (event.deltaY < 0 ? 1.12 : 1 / 1.12))
          }}
        >
          <img
            key={image.src + index}
            ref={imageRef}
            src={image.src}
            alt={image.alt}
            draggable={false}
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              cursor: zoom > 1 ? 'grab' : 'default',
            }}
            onPointerDown={(event) => {
              if (zoom <= 1) return
              dragRef.current = { x: event.clientX, y: event.clientY, panX: pan.x, panY: pan.y }
              event.currentTarget.setPointerCapture(event.pointerId)
            }}
            onPointerMove={(event) => {
              const drag = dragRef.current
              if (drag)
                setPan(
                  clampPan(
                    drag.panX + event.clientX - drag.x,
                    drag.panY + event.clientY - drag.y,
                    zoom,
                  ),
                )
            }}
            onPointerUp={() => {
              dragRef.current = null
            }}
            onPointerCancel={() => {
              dragRef.current = null
            }}
          />
        </div>
        {images.length > 1 && (
          <button
            className="image-lightbox-arrow"
            type="button"
            aria-label="다음 이미지"
            onClick={() => select(index + 1)}
          >
            <ChevronRight size={28} />
          </button>
        )}
      </div>
      <div className="image-lightbox-thumbnails" onClick={(event) => event.stopPropagation()}>
        <div className="image-lightbox-strip" ref={stripRef}>
          <div className="image-lightbox-strip-inner">
            {images.map((item, itemIndex) => (
              <button
                className={`image-lightbox-thumb ${itemIndex === index ? 'is-active' : ''}`}
                key={`${item.src}-${itemIndex}`}
                type="button"
                aria-label={`${itemIndex + 1}번째 이미지 보기: ${item.alt}`}
                aria-current={itemIndex === index ? 'true' : undefined}
                ref={(node) => {
                  thumbsRef.current[itemIndex] = node
                }}
                onClick={() => select(itemIndex)}
              >
                <img src={item.src} alt="" loading="lazy" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}
