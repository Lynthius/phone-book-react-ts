// import style from "./Wrapper.module.css"

type WrapperProps={
    children: React.ReactNode;
}

export const Wrapper = ({children}:WrapperProps) => {
  return (
    <div className="flex flex-wrap gap-6 p-8 bg-slate-200 ">
        {children}
    </div>
  )
}


