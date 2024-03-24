import style from "./Wrapper.module.css"

type WrapperProps={
    children: React.ReactNode;
}

export const Wrapper = ({children}:WrapperProps) => {
  return (
    <div className={style.box}>
        {children}
    </div>
  )
}


