import Subject from '../Subject/Subject'
import './Profile.css'

const subjectData = [
  {
    id: 1,
    title: "Технологии и методы программирования",
  },
  {
    id: 2,
    title: "Электроника аппаратных средств защиты информации",
  },
  {
    id: 3,
    title: "Схемотехника дискретных устройств",
  },
  {
    id: 4,
    title: "Схемотехника аппаратных средств защиты информации",
  },
  {
    id: 5,
    title: "Основы микро- и радиоэлектроники",
  },
]

const Profile = () => {
  return (
    <section className="subjects">
      {subjectData.map((subject) => (
        <Subject
          key={subject.id}
          id={subject.id}
          title={subject.title}
        />
      ))}
    </section>
  )
}

export default Profile
