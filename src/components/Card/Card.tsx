// import style from "./Card.module.css";

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
    <div className="flex flex-wrap flex-col md:flex-row gap-x-8 gap-y-6 p-4 bg-gray-700 rounded-xl">
      <img className="w-16 h-16 rounded-full" src={imgSrc} alt="" />
      <div className="border-l pl-8 border-gray-500">
        <div className="flex flex-col">
          <h3 className="font-medium text-lg ">{`${name} ${surname}`}</h3>
        </div>
        <div className="flex flex-col">
          <h4>Address:</h4>
          <h4>{`${street}, ${postCode}`}</h4>
          <h4>{street}</h4>
          <h4>{subRegion}</h4>
        </div>
        <div className="flex flex-col">
          <h4>{phoneNumber}</h4>
        </div>
      </div>
    </div>
  );
};







