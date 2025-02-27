import { useEffect } from 'react';

const SparkWrapper = ({ children, className }) => {
    useEffect(() => {
        import('./sparkly-text.js');
    }, []);

    return <sparkly-text class={className}>{children}</sparkly-text>;
};

export default SparkWrapper;