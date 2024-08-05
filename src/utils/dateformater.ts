import {format} from 'date-fns'

export const formatDate = (dateString :any) => {
    return format(new Date(dateString), 'PPpp'); // Customize the format as needed
};