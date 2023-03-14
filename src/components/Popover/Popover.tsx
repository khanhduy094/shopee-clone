import {
  arrow,
  FloatingArrow,
  FloatingPortal,
  offset,
  safePolygon,
  shift,
  useFloating,
  useHover,
  useInteractions,
  type Placement
} from '@floating-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useRef, useState, ElementType, useId } from 'react'

interface Props {
  className?: string
  children: React.ReactNode
  as?: ElementType
  renderPopover: React.ReactNode
  initialOpen?: boolean
  placement?: Placement
}

export default function Popover({
  children,
  renderPopover,
  initialOpen,
  className,
  placement,
  as: ElementType = 'div'
}: Props) {
  const [isOpen, setIsOpen] = useState(initialOpen || false)
  const id = useId()
  const arrowRef = useRef(null)

  const { x, y, strategy, refs, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      offset(6),
      shift(),
      arrow({
        element: arrowRef
      })
    ],
    placement: placement
  })
  const hover = useHover(context, {
    handleClose: safePolygon()
  })

  const { getReferenceProps, getFloatingProps } = useInteractions([hover])
  return (
    <ElementType className={className} ref={refs.setReference} {...getReferenceProps()}>
      {children}
      <FloatingPortal id={id}>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={refs.setFloating}
              style={{
                position: strategy,
                top: y ?? 0,
                left: x ?? 0
              }}
              initial={{ opacity: 0, transform: 'scale(0)' }}
              animate={{ opacity: 1, transform: 'scale(1)' }}
              exit={{ opacity: 0, transform: 'scale(0)' }}
              transition={{ duration: 0.175 }}
              {...getFloatingProps()}
            >
              <FloatingArrow ref={arrowRef} context={context} fill='white' />
              {renderPopover}
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </ElementType>
  )
}
