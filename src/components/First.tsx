import { parseText } from "../helpers"

type FirstProps={
  text?:string
}

export const First = ({text="HI"}:FirstProps) => {
  if(text==="is"){
    return <>{parseText("is was here")}</>
  }
  return (<>
    <div>First {text}</div>
    <div></div>
    </>
  )
}
