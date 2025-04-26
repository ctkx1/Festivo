interface ArtistValue {
	name: string
	id: number
	img: any
	day: string
	spotify?: string
	youtube?: string
	listeners?: string
	description?: string
}

export const ARTISTS: ArtistValue[] = [
	{
		name: "PRO8L3M",
		img: require("@/assets/images/problem.png"),
		id: 1,
		day: "Sobota",
		spotify: "https://open.spotify.com/artist/7v49oVVUhvIQG5EK0jkcF7",
		youtube: "https://www.youtube.com/c/PRO8L3M",
		listeners: "1,9 mln",
		description:
			'PRO8L3M to warszawski duet hip-hopowy, w którego skład wchodzą raper Oskar oraz producent Steez83. Znani są z unikalnego stylu łączącego klasyczne hip-hopowe brzmienia z nowoczesną elektroniką, synthwave\'em i cyberpunkowym klimatem. Ich teksty są często bardzo osobiste, pełne miejskich opowieści, refleksji nad życiem, technologią, konsumpcjonizmem oraz przemianami społecznymi. Każdy ich album to przemyślana, konceptualna historia – od futurystycznego "Hack3d By Gh05t 2.0", po nostalgiczne "Art Brut". Dzięki innowacyjnemu podejściu i mocnym, niebanalnym tekstom, zyskali sobie ogromną rzeszę fanów oraz uznanie krytyków.',
	},
	{
		name: "Zeamsone",
		img: require("@/assets/images/zeamsone.jpg"),
		id: 2,
		day: "Sobota",
		spotify: "https://open.spotify.com/artist/1FdfWn1DrRwWDtRK8faYKY",
		youtube: "https://www.youtube.com/@zeamsone",
		listeners: "1,1 mln",
		description:
			"Zeamsone, pochodzący z Przemyśla, to jeden z najciekawszych przedstawicieli młodego pokolenia polskiej sceny rapowej. Zadebiutował jako nastolatek i od początku dał się poznać jako twórca ambitny, nieszablonowy i całkowicie niezależny. Jego teksty często poruszają tematykę samotności, emocjonalnych zmagań, ambicji i ciemnych stron dorastania. Zeamsone tworzy głównie w stylistyce trapowej, lecz nie stroni od bardziej lirycznych i melancholijnych brzmień. Wyróżnia się autentycznością i konsekwencją w budowaniu własnej tożsamości artystycznej. Samodzielnie produkuje dużą część swojej muzyki, co daje mu pełną kontrolę nad brzmieniem i przekazem.",
	},
	{
		name: "Chivas",
		img: require("@/assets/images/chivas.jpg"),
		id: 3,
		day: "Piątek",
		spotify: "https://open.spotify.com/artist/3vYk4T1Fz2yR0u3n9N2v5D",
		youtube: "https://www.youtube.com/@ChivasOFFICIAL",
		listeners: "1,1 mln",
		description:
			"Chivas to artysta reprezentujący nowe pokolenie polskiego rapu, który szybko zdobył popularność dzięki swojej szczerości i emocjonalnym tekstom. Jego twórczość to połączenie delikatnych melodii z surowym przekazem, balansujące na granicy rapu, emo rapu i alternatywnego popu. Chivas nie boi się mówić o trudnych emocjach, toksycznych relacjach, samotności i problemach psychicznych, co czyni go bardzo autentycznym i bliskim słuchaczom artystą. Dzięki tej wrażliwości i wyjątkowemu stylowi, jego utwory cieszą się dużym zainteresowaniem zarówno w serwisach streamingowych, jak i na koncertach.",
	},
	{
		name: "Sobel",
		img: require("@/assets/images/sopel.jpg"),
		id: 4,
		day: "Niedziela",
		spotify: "https://open.spotify.com/artist/4L2Z3USKCqa1bntFJ49yYF",
		youtube: "https://www.youtube.com/@SobelVEVO",
		listeners: "2,4 mln",
		description:
			"Sobel to jeden z najbardziej rozpoznawalnych artystów młodego pokolenia w Polsce. Jego muzyka to mieszanka hip-hopu, popu oraz nowoczesnych brzmień elektronicznych. Dzięki chwytliwym refrenom i charakterystycznemu wokalowi, jego utwory szybko trafiają na listy przebojów i zdobywają miliony odtworzeń. Sobel wyróżnia się umiejętnością opowiadania historii w prosty, ale emocjonalny sposób, co sprawia, że jego twórczość trafia zarówno do młodszej, jak i starszej publiczności. Znany jest także z wyrazistego stylu scenicznego oraz bardzo dopracowanej oprawy wizualnej swoich teledysków i występów.",
	},
	{
		name: "Oki",
		img: require("@/assets/images/Oki.webp"),
		id: 5,
		day: "Sobota",
		spotify: "https://open.spotify.com/artist/5xc6xayxZgHLjXzZK6u7NE",
		youtube: "https://www.youtube.com/@Oki_Official",
		listeners: "2,08 mln",
		description:
			"Oki to jeden z najbardziej kreatywnych i wszechstronnych raperów na polskiej scenie. Jego twórczość cechuje się ogromną różnorodnością – potrafi łączyć klasyczny hip-hop z nowoczesnym trapem, elektroniką, a nawet elementami rocka. Jego teksty pełne są odniesień do popkultury, ironii oraz dystansu do samego siebie i świata. Oki zyskał popularność dzięki charyzmie, oryginalnemu flow oraz odważnym eksperymentom muzycznym. Jest współzałożycielem labelu 2020, w ramach którego współpracuje z innymi innowacyjnymi twórcami. Jego koncerty to żywiołowe show, które przyciągają tłumy młodych fanów spragnionych świeżej energii na scenie.",
	},
	{
		name: "Kuban",
		img: require("@/assets/images/kuban.jpg"),
		id: 6,
		day: "Piątek",
		spotify: "https://open.spotify.com/artist/0fGZ3lFqW9uZ1Vh9zZVZ6T",
		youtube: "https://www.youtube.com/@KubanOfficial",
		listeners: "1,2 mln",
		description:
			"Kuban to artysta znany z melodyjnych, refleksyjnych utworów, łączących rap z elementami popu i R&B. (...)",
	},
	{
		name: "Guzior",
		img: require("@/assets/images/guzior.jpg"),
		id: 7,
		day: "Sobota",
		spotify: "https://open.spotify.com/artist/3vYk4T1Fz2yR0u3n9N2v5D",
		youtube: "https://www.youtube.com/@GuziorOfficial",
		listeners: "1,5 mln",
		description:
			"Guzior to raper znany z eksperymentalnego podejścia do muzyki, łączący mroczne, elektroniczne brzmienia (...)",
	},
	{
		name: "White 2115",
		img: require("@/assets/images/white.jpeg"),
		id: 8,
		day: "Piątek",
		spotify: "https://open.spotify.com/artist/1FdfWn1DrRwWDtRK8faYKY",
		youtube: "https://www.youtube.com/@White2115VEVO",
		listeners: "2,0 mln",
		description:
			"White 2115 to członek kolektywu 2115, znany z energetycznych utworów łączących trapowe brzmienia (...)",
	},
	{
		name: "Fukaj",
		img: require("@/assets/images/fukaj.jpg"),
		id: 9,
		day: "Piątek",
		spotify: "https://open.spotify.com/artist/5xc6xayxZgHLjXzZK6u7NE",
		youtube: "https://www.youtube.com/@FukajOfficial",
		listeners: "900 tys.",
		description:
			"Fukaj to młody artysta, którego twórczość łączy emocjonalne teksty z nowoczesnymi, często eksperymentalnymi brzmieniami.",
	},
	{
		name: "Bambi",
		img: require("@/assets/images/bambi.jpg"),
		id: 10,
		day: "Sobota",
		spotify: "https://open.spotify.com/artist/4L2Z3USKCqa1bntFJ49yYF",
		youtube: "https://www.youtube.com/@BambiVEVO",
		listeners: "1,1 mln",
		description:
			"Bambi to artystka łącząca trapowe brzmienia z melodyjnym wokalem, tworząc utwory o silnym ładunku emocjonalnym.",
	},
	{
		name: "Asster",
		img: require("@/assets/images/asster.jpg"),
		id: 11,
		day: "Piątek",
		spotify: "https://open.spotify.com/artist/7v49oVVUhvIQG5EK0jkcF7",
		youtube: "https://www.youtube.com/@AssterOfficial",
		listeners: "800 tys.",
		description:
			"Asster to raper znany z dynamicznych utworów, łączących nowoczesne brzmienia z osobistymi tekstami.",
	},
	{
		name: "Miszel",
		img: require("@/assets/images/miszel.jpg"),
		id: 12,
		day: "Niedziela",
		spotify: "https://open.spotify.com/artist/3vYk4T1Fz2yR0u3n9N2v5D",
		youtube: "https://www.youtube.com/@MiszelOfficial",
		listeners: "600 tys.",
		description:
			"Miszel to młody raper eksplorujący tematy młodzieńczej rzeczywistości i emocjonalnych zmagań na tle surowych i brudnych bitów.",
	},
]
