import { format, parse, isValid } from 'date-fns';

export function strftime(formatString: string, dateString?: string): string {
	const placeholders: { [key: string]: string } = {
		'%a': 'EEE',
		'%A': 'EEEE',
		'%b': 'MMM',
		'%B': 'MMMM',
		'%c': 'EEE MMM dd HH:mm:ss yyyy',
		'%C': '',
		'%d': 'dd',
		'%D': 'MM/dd/yy',
		'%e': 'd',
		'%F': 'yyyy-MM-dd',
		'%g': '',
		'%G': '',
		'%h': 'MMM',
		'%H': 'HH',
		'%I': 'hh',
		'%j': 'DDD',
		'%k': 'H',
		'%l': 'h',
		'%m': 'MM',
		'%M': 'mm',
		'%n': '\n',
		'%p': 'a',
		'%P': 'a',
		'%r': 'hh:mm:ss a',
		'%R': 'HH:mm',
		'%s': '',
		'%S': 'ss',
		'%t': '\t',
		'%T': 'HH:mm:ss',
		'%u': 'E',
		'%U': '',
		'%V': '',
		'%w': 'e',
		'%W': '',
		'%x': 'MM/dd/yy',
		'%X': 'HH:mm:ss',
		'%y': 'yy',
		'%Y': 'yyyy',
		'%z': 'xxx',
		'%Z': 'zzz',
		'%%': '%'
	};

	let convertedFormatString = formatString;

	if (!convertedFormatString) {
		return '';
	}

	for (const placeholder in placeholders) {
		if (Object.prototype.hasOwnProperty.call(placeholders, placeholder)) {
			convertedFormatString = convertedFormatString.replace(placeholder, placeholders[placeholder]);
		}
	}

	let parsedDate;
	if (dateString && isValid(parse(dateString, 'yyyy-MM-dd', new Date()))) {
		parsedDate = parse(dateString, 'yyyy-MM-dd', new Date());
	} else {
		parsedDate = new Date();
	}

	return format(parsedDate, convertedFormatString);
}
