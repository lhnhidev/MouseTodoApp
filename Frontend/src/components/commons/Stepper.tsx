interface Step {
  id: string
  label: string
}

interface StepperProps {
  steps: Step[]
  currentStep: number
}

const Stepper = ({ steps, currentStep }: StepperProps) => {
  return (
    <div className="mb-6">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-semibold tracking-wide text-(--text-primary-color) uppercase">
          {steps[currentStep].label}
        </span>
        <span className="text-xs font-medium text-(--text-placeholder-color)">
          Bước {currentStep + 1} / {steps.length}
        </span>
      </div>
      <div className="flex gap-1.5">
        {steps.map((step, i) => (
          <div
            key={step.id}
            className={`h-0.5 flex-1 rounded-full transition-all duration-500 ${
              i <= currentStep ? "bg-gray-900" : "bg-gray-100"
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default Stepper
