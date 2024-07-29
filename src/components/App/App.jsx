import Description from "../Description/Description";
import Options from "../Options/Options";
import Feedback from "../Feedback/Feedback";
import Notification from "../Notification/Notification";
import "../../../index.css";
import { useState, useEffect } from 'react';

export default function App() {
    const [feedback, setFeedback] = useState(() => {
        const savedFeedback = localStorage.getItem('num-of-feedback');
        if(savedFeedback !== null) {
            return JSON.parse(savedFeedback)
        }

        return { good: 0, neutral: 0, bad: 0 };
        }
    )

    const updateFeedback = (type) => {
        setFeedback((clicks) => ({
            ...clicks,
            [type]: clicks[type] + 1
        }));
    };

    const resetFeedback = () => {
        setFeedback({
        good: 0,
        neutral: 0,
        bad: 0
    })
    }

    useEffect(() => {
        localStorage.setItem('num-of-feedback', JSON.stringify(feedback))
    }, [feedback]);

    const totalFeedback = feedback.good + feedback.neutral + feedback.bad;
    const positiveFeedback = Math.round((feedback.good / totalFeedback) * 100);

        
    return (
        <>
            <Description />
            <Options updateFeedback={updateFeedback} resetFeedback={resetFeedback} totalFeedback={totalFeedback} />
            {totalFeedback > 0 ? (
                <Feedback feedback={feedback} positiveFeedback={positiveFeedback} totalFeedback={totalFeedback} />
            ) : (
                <Notification message="No feedback yet" />
            )}
        </>
    );
}