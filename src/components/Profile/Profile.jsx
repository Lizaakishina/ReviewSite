import Subject from '../Subject/Subject';
import './Profile.css';

const subjectData = [
  {
    id: 1,
    title: "Технологии и методы программирования",
    semester: "2 семестр",
  },
  {
    id: 2,
    title: "Электроника аппаратных средств защиты информации",
    semester: "4 семестр",
  },
  {
    id: 3,
    title: "Схемотехника дискретных устройств",
    semester: "4 семестр",
  },
  {
    id: 4,
    title: "Схемотехника аппаратных средств защиты информации",
    semester: "5 семестр",
  },
  {
    id: 5,
    title: "Основы микро- и радиоэлектроники",
    semester: "5 семестр",
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
          semester={subject.semester}
        />
      ))}
    </section>
  )
}

export default Profile
