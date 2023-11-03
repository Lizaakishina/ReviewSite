import './Profile.css'

const Profile = () => {

  return (
    <section className="subjects">
      <div className="subject">
        <div className="subject__image"></div>
        <a className="subject__name" href="#">Технологии и методы программирования</a>
      </div>
      <div className="subject">
        <div className="subject__image"></div>
        <a className="subject__name" href="#">Электроника аппаратных средств защиты информации</a>
      </div>
      <div className="subject">
        <div className="subject__image"></div>
        <a className="subject__name" href="#">Схемотехника дискретных устройств</a>
      </div>
      <div className="subject">
        <div className="subject__image"></div>
        <a className="subject__name" href="#">Схемотехника аппаратных средств защиты информации</a>
      </div>
      <div className="subject">
        <div className="subject__image"></div>
        <a className="subject__name" href="#">Основы микро- и радиоэлектроники</a>
      </div>
    </section>
  )
}

export default Profile
