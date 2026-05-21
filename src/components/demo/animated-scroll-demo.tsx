import ScrollAdventure from '@/components/ui/animated-scroll'

interface WhyChooseUsProps {
  onEscapeUp?: () => void
  onEscapeDown?: () => void
  locked?: boolean
  initialPage?: number
}

export default function WhyChooseUs({ onEscapeUp, onEscapeDown, locked, initialPage }: WhyChooseUsProps) {
  return (
    <section className="w-full h-screen">
      <ScrollAdventure onEscapeUp={onEscapeUp} onEscapeDown={onEscapeDown} locked={locked} initialPage={initialPage} />
    </section>
  )
}
