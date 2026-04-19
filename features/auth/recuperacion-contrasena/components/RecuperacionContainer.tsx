import { StepEmail } from "./StepEmail"
import { StepCode } from "./StepCode"
import { StepPassword } from "./StepPassword"

export const RecuperacionContainer = (props: any) => {
    return (
        <div className="relative">
            <div className="overflow-hidden relative w-full h-full pb-4">
                <div
                    className="flex transition-transform duration-500 ease-in-out w-[300%]"
                    style={{ transform: `translateX(-${(props.step - 1) * 33.333333}%)` }}
                >
                    <div className="w-1/3 shrink-0 px-1">
                        <StepEmail {...props} />
                    </div>
                    <div className="w-1/3 shrink-0 px-1">
                        <StepCode {...props} />
                    </div>
                    <div className="w-1/3 shrink-0 px-1">
                        <StepPassword {...props} />
                    </div>
                </div>
            </div>
        </div>
    )
}
