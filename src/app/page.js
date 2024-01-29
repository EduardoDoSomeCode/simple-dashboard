"use client"
import { useState, useEffect } from "react";
export default function Home() {

  const [wordFetch, setWordFetch] = useState([])
  const [word, setWord] = useState("")
  const [list, setList] = useState([])
  const [timerTimer, setTimerTime] = useState(0)
  const addTimer =()=>{
      let startTimer = 25
      let pomodoroTimer = startTimer * 60
      setTimerTime(pomodoroTimer)
      setInterval(() => {
        pomodoroTimer--
        setTimerTime(pomodoroTimer--)
      }, 1000);

  }

  useEffect(() => {
    fetch("https://api.quotable.io/quotes/random").then(response => {
      if (response.ok) {
        return response.json()
      }
      throw response;
    }).then(data => {
      setWordFetch(data)
      console.log(data)
    }).catch(error => {
      console.error(error)
    })

    addTimer()
  }, [])


  const addTask = (event) => {
    console.log(event.target.value)
    setWord(event.target.value)

  }
  const addToTask = () => {
    setList([...list, word])
  }

  const deleteTask =(text)=>{
    const newArrayTask = list.filter((element) => element !== text)
    setList(newArrayTask)



  }


  return (
    <>

    <main className="grid grid-cols-2 gap-4	p-6 w-full h-svh	 h-dvh	 ">
     
      <section className="bg-indigo-400 p-2 row-span-3 rounded-xl">
        <input className="border-blue-500	" onChange={addTask} />
        <button onClick={addToTask} className="bg-red-300 p-3 rounded-md" >add</button>
        <section>
          {
            list.map((element, index) => (
              <div className="bg-gray-400  flex justify-between		items-center		 " key={index}>
                <span className="p-2">
                {element}

                </span>
                <button onClick={()=> deleteTask(element)} className="bg-red-300 p-2  hover:bg-red-500 ">Delete</button>
                </div>
            ))
          }
        </section>
      </section>

      <section className=" flex  justify-center		items-center	  bg-indigo-400 rounded-xl row-span-2 col-span-1">
        <div className="flex  justify-center		items-center	p-4">
          <div  className=" rounded-full w-48 h-48 flex  justify-center		items-center border-4 border-sky-600">
            {`${ parseInt(timerTimer / 60)}  : ${ parseInt(timerTimer % 60)}`}
          </div>
        </div>
      </section>


      <section className="bg-indigo-400 p-2 rounded-xl flex justify-center	items-center flex-col	 gap-1 	">

        {wordFetch.map((element) => (
          <p className="flex justify-center	items-center flex-col	 gap-1">
            <span className="text-xl font-black  	">
              "{element.content}"

            </span>
            <span>
              {element.author}
            </span>
          </p>
        ))}

      </section>

    </main>
    </>
  );
}
