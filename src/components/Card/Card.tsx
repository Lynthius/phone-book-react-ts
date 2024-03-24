import style from "./Card.module.css";

type CardProps = {
  imgSrc: string;
  name: string;
  surname: string;
  street: string;
  postCode: string;
  town: string;
  subRegion: string;
  phoneNumber: string;
};

export const Card = ({ imgSrc, name, surname, street, postCode, subRegion, phoneNumber }: CardProps) => {
  return (
    <div className={style.card}>
      <img className={style.avatar} src={imgSrc} alt="" />
      <div className={style["card-info-wrapper"]}>
        <div className={style["info-wrapper"]}>
          <h3>{`${name} ${surname}`}</h3>
        </div>
        <div className={style["info-wrapper"]}>
          <h4>Address:</h4>
          <h4>{`${street}, ${postCode}`}</h4>
          <h4>{street}</h4>
          <h4>{subRegion}</h4>
        </div>
        <div className={style["info-wrapper"]}>
          <h4>{phoneNumber}</h4>
        </div>
      </div>
    </div>
  );
};







