export default function DataBase(LocalKey, localtweetsList) {
  localStorage.setItem(LocalKey, localtweetsList)
  // console.log(JSON.parse(localStorage.getItem("myITCtweetApp")))
  const db = JSON.parse(localStorage.getItem("myITCtweetApp"))
  return db
}
