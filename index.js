let p = document.querySelector('p')

let sample = `Ваня хороший и умный, красивый и молодец. Наташа хорошо и правильно выполняет задачи и пишет классные программы. Паша генеративный арт делает хорошо и вообще. Занятия ведёт потрясающие. И Паша тоже крутой!`
let rm = new RiTa.Markov(2)
rm.addText(sample)
p.innerHTML = rm.generate(10).join('<br>')
