import { useState } from "react";

const QUESTIONS = [
  { id: "budget", title: "💴 予算は？", options: ["〜3万","3〜6万","6〜10万","10万以上"] },
  { id: "usage", title: "🎯 何に使う？", options: ["ゲーム","カメラ","SNS","仕事"] },
];

const PHONES = [
  { name: "Pixel 9", usage:["カメラ","SNS"], price:"3〜6万" },
  { name: "ROG Phone 8", usage:["ゲーム"], price:"10万以上" },
  { name: "Galaxy S25", usage:["SNS"], price:"6〜10万" },
];

export default function App(){
  const [step,setStep] = useState(0);
  const [answers,setAnswers] = useState({});
  const [result,setResult] = useState(null);

  const current = QUESTIONS[step];

  const select = (val)=>{
    const newAns = {...answers,[current.id]:val};
    setAnswers(newAns);

    if(step+1 >= QUESTIONS.length){
      const ranked = PHONES.map(p=>{
        let score=0;
        if(p.price===newAns.budget) score+=50;
        if(p.usage.includes(newAns.usage)) score+=50;
        return {...p,score};
      }).sort((a,b)=>b.score-a.score);
      setResult(ranked);
    }else{
      setStep(step+1);
    }
  };

  if(result){
    return (
      <div style={{padding:"20px",color:"#fff"}}>
        <h1>✨ 診断結果</h1>
        {result.map((p,i)=>(
