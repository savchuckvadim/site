import { useAppSelector } from '@/modules/app';
import React from 'react';
import { motion } from "framer-motion";
import TypingLoader from '../Loader/TypinhLoader';

const Answer = ({ }) => {

    const currentAnswer = useAppSelector(state => state.chat.currentResponse.message)
    const isLoading = useAppSelector(state => state.chat.currentResponse.isLoading)

    return (
        <motion.div
            key={'current_answer_message'}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={`flex justify-start`}
        >
            <div className="flex flex-col gap-y-3">
                <div className="relative max-w-xxl px-4 py-2 rounded-lg text-black bg-gray-100" >

                    <p>
                        {currentAnswer}
                    </p>

                    {isLoading && <TypingLoader />}

                </div>
            </div>
        </motion.div >
    );
}

export default Answer;