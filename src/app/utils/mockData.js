import professions from '../mockData/professions.json';
import qualities from '../mockData/qualities.json';
import users from '../mockData/users.json';
import { useEffect, useState } from 'react';
import httpService from '../services/httpService';

const useMockData = () => {
    const statusConsts = {
        idle: 'Not Started',
        pending: 'In Progress',
        success: 'Ready',
        error: 'Error occurred'
    };
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(statusConsts.idle);
    const [progress, setProgress] = useState(0);
    const [count, setCount] = useState(0);
    const summaryCount = professions.length + qualities.length + users.length;
    const incrementCount = () => {
        setCount((prevState) => prevState + 1);
    };
    const updateProgress = () => {
        if (count !== 0 && status === statusConsts.idle) {
            setStatus(statusConsts.pending);
        }
        const newProgress = Math.floor((count / summaryCount) * 100);
        if (progress < newProgress) {
            setProgress(() => newProgress);
        }
        if (newProgress === 100) {
            setStatus(statusConsts.success);
        }
    };
    useEffect(() => {
        updateProgress();
    }, [count]);

    async function initialize() {
        try {
            for (const prof of professions) {
                await httpService.put('profession/' + prof._id, prof);
                incrementCount();
            }
            for (const user of users) {
                await httpService.put('user/' + user._id, user);
                incrementCount();
            }
            for (const quality of qualities) {
                await httpService.put('quality/' + quality._id, quality);
                incrementCount();
            }
        } catch (error) {
            setError(error);
            setStatus(statusConsts.error);
        }
    }

    return { error, initialize, progress, status };
};

export default useMockData;
