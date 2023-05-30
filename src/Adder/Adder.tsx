import {
  forwardRef,
  Input,
  InputGroup,
  InputGroupProps,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import getEmojiFromText from "emoji-from-text";
import {
  ChangeEventHandler,
  FocusEventHandler,
  useCallback,
  useState,
} from "react";

import { useSyncedStore } from "@syncedstore/react";
import * as R from "ramda";
import { store, Thingy } from "../store";

export interface Props extends InputGroupProps {
  where?: keyof typeof store;
}

const initialEmoji: Record<keyof typeof store, string> = {
  today: "🏄‍♂️",
  bucket: "🪣",
  later: "🐼",
};

const Adder = forwardRef<Props, "div">((props, ref) => {
  const { where = "bucket", placeholder } = props;
  const tasks = useSyncedStore(store);
  const [emoji, generateEmoji, clearEmoji] = useInputEmoji(getRandomEmoji());
  const [text, setText] = useState("");

  const handleChange: ChangeEventHandler<HTMLInputElement> = R.pipe(
    (e) => e.target.value,
    setText
  );

  const onAdd = () => {
    if (!text) return;

    const task: Thingy = {
      id: crypto.randomUUID(),
      title: {
        text,
        emoji,
      },
      createdAt: new Date(),
      progress: 0,
      residence: "default",
    };

    try {
      tasks[where].push(task);
    } catch (e) {
      alert("dev is stupid, text him t.me/snqba");
    } finally {
      setText("");
      clearEmoji();
    }
  };

  console.log(placeholder);

  return (
    <InputGroup
      variant="filled"
      ml={-2}
      width="calc(100% + 8px)"
      opacity={0.9}
      _focusWithin={{
        opacity: 1,
      }}
      size="md"
      ref={ref}
      {...props}
    >
      <InputLeftElement pointerEvents="none" children={<span>{emoji}</span>} />
      <Input
        id={`adder-${where}`}
        type="text"
        autoComplete="off"
        value={text}
        onChange={handleChange}
        onBlur={onAdd}
        onInput={generateEmoji}
        placeholder={placeholder}
        onKeyDown={R.when((e) => e.key === "Enter", onAdd)}
      />
      <InputRightElement onClick={onAdd} fontSize="2xl" children="↵" />
    </InputGroup>
  );
});

const useInputEmoji = (
  initial: string = getRandomEmoji()
): [string, ChangeEventHandler<HTMLInputElement>, () => void] => {
  const [emoji, setEmoji] = useState(initial);

  const clearEmoji = useCallback(() => setEmoji(getRandomEmoji()), []);

  const generateEmojiFromText: ChangeEventHandler<HTMLInputElement> = R.pipe(
    (e) => e.currentTarget.value,
    R.cond([
      [R.either(R.isEmpty, R.isNil), clearEmoji],
      [R.T, R.pipe(getRandomEmoji, setEmoji)],
    ])
  );

  return [emoji, generateEmojiFromText, clearEmoji];
};

export default Adder;

export function getRandomEmoji() {
  return emojis[Math.floor(Math.random() * emojis.length)];
}

const emojis = [
  "😄",
  "😃",
  "😀",
  "😊",
  "☺",
  "😉",
  "😍",
  "😘",
  "😚",
  "😗",
  "😙",
  "😜",
  "😝",
  "😛",
  "😳",
  "😁",
  "😔",
  "😌",
  "😒",
  "😞",
  "😣",
  "😢",
  "😂",
  "😭",
  "😪",
  "😥",
  "😰",
  "😅",
  "😓",
  "😩",
  "😫",
  "😨",
  "😱",
  "😠",
  "😡",
  "😤",
  "😖",
  "😆",
  "😋",
  "😷",
  "😎",
  "😴",
  "😵",
  "😲",
  "😟",
  "😦",
  "😧",
  "😈",
  "👿",
  "😮",
  "😬",
  "😐",
  "😕",
  "😯",
  "😶",
  "😇",
  "😏",
  "😑",
  "👲",
  "👳",
  "👮",
  "👷",
  "💂",
  "👶",
  "👦",
  "👧",
  "👨",
  "👩",
  "👴",
  "👵",
  "👱",
  "👼",
  "👸",
  "😺",
  "😸",
  "😻",
  "😽",
  "😼",
  "🙀",
  "😿",
  "😹",
  "😾",
  "👹",
  "👺",
  "🙈",
  "🙉",
  "🙊",
  "💀",
  "👽",
  "💩",
  "🔥",
  "✨",
  "🌟",
  "💫",
  "💥",
  "💢",
  "💦",
  "💧",
  "💤",
  "💨",
  "👂",
  "👀",
  "👃",
  "👅",
  "👄",
  "👍",
  "👎",
  "👌",
  "👊",
  "✊",
  "✌",
  "👋",
  "✋",
  "👐",
  "👆",
  "👇",
  "👉",
  "👈",
  "🙌",
  "🙏",
  "☝",
  "👏",
  "💪",
  "🚶",
  "🏃",
  "💃",
  "👫",
  "👪",
  "👬",
  "👭",
  "💏",
  "💑",
  "👯",
  "🙆",
  "🙅",
  "💁",
  "🙋",
  "💆",
  "💇",
  "💅",
  "👰",
  "🙎",
  "🙍",
  "🙇",
  "🎩",
  "👑",
  "👒",
  "👟",
  "👞",
  "👡",
  "👠",
  "👢",
  "👕",
  "👔",
  "👚",
  "👗",
  "🎽",
  "👖",
  "👘",
  "👙",
  "💼",
  "👜",
  "👝",
  "👛",
  "👓",
  "🎀",
  "🌂",
  "💄",
  "💛",
  "💙",
  "💜",
  "💚",
  "❤",
  "💔",
  "💗",
  "💓",
  "💕",
  "💖",
  "💞",
  "💘",
  "💌",
  "💋",
  "💍",
  "💎",
  "👤",
  "👥",
  "💬",
  "👣",
  "💭",
  "🐶",
  "🐺",
  "🐱",
  "🐭",
  "🐹",
  "🐰",
  "🐸",
  "🐯",
  "🐨",
  "🐻",
  "🐷",
  "🐽",
  "🐮",
  "🐗",
  "🐵",
  "🐒",
  "🐴",
  "🐑",
  "🐘",
  "🐼",
  "🐧",
  "🐦",
  "🐤",
  "🐥",
  "🐣",
  "🐔",
  "🐍",
  "🐢",
  "🐛",
  "🐝",
  "🐜",
  "🐞",
  "🐌",
  "🐙",
  "🐚",
  "🐠",
  "🐟",
  "🐬",
  "🐳",
  "🐋",
  "🐄",
  "🐏",
  "🐀",
  "🐃",
  "🐅",
  "🐇",
  "🐉",
  "🐎",
  "🐐",
  "🐓",
  "🐕",
  "🐖",
  "🐁",
  "🐂",
  "🐲",
  "🐡",
  "🐊",
  "🐫",
  "🐪",
  "🐆",
  "🐈",
  "🐩",
  "🐾",
  "💐",
  "🌸",
  "🌷",
  "🍀",
  "🌹",
  "🌻",
  "🌺",
  "🍁",
  "🍃",
  "🍂",
  "🌿",
  "🌾",
  "🍄",
  "🌵",
  "🌴",
  "🌲",
  "🌳",
  "🌰",
  "🌱",
  "🌼",
  "🌐",
  "🌞",
  "🌝",
  "🌚",
  "🌑",
  "🌒",
  "🌓",
  "🌔",
  "🌕",
  "🌖",
  "🌗",
  "🌘",
  "🌜",
  "🌛",
  "🌙",
  "🌍",
  "🌎",
  "🌏",
  "🌋",
  "🌌",
  "🌠",
  "⭐",
  "☀",
  "⛅",
  "☁",
  "⚡",
  "☔",
  "❄",
  "⛄",
  "🌀",
  "🌁",
  "🌈",
  "🌊",
  "🎍",
  "💝",
  "🎎",
  "🎒",
  "🎓",
  "🎏",
  "🎆",
  "🎇",
  "🎐",
  "🎑",
  "🎃",
  "👻",
  "🎅",
  "🎄",
  "🎁",
  "🎋",
  "🎉",
  "🎊",
  "🎈",
  "🎌",
  "🔮",
  "🎥",
  "📷",
  "📹",
  "📼",
  "💿",
  "📀",
  "💽",
  "💾",
  "💻",
  "📱",
  "☎",
  "📞",
  "📟",
  "📠",
  "📡",
  "📺",
  "📻",
  "🔊",
  "🔉",
  "🔈",
  "🔇",
  "🔔",
  "🔕",
  "📢",
  "📣",
  "⏳",
  "⌛",
  "⏰",
  "⌚",
  "🔓",
  "🔒",
  "🔏",
  "🔐",
  "🔑",
  "🔎",
  "💡",
  "🔦",
  "🔆",
  "🔅",
  "🔌",
  "🔋",
  "🔍",
  "🛁",
  "🛀",
  "🚿",
  "🚽",
  "🔧",
  "🔩",
  "🔨",
  "🚪",
  "🚬",
  "💣",
  "🔫",
  "🔪",
  "💊",
  "💉",
  "💰",
  "💴",
  "💵",
  "💷",
  "💶",
  "💳",
  "💸",
  "📲",
  "📧",
  "📥",
  "📤",
  "✉",
  "📩",
  "📨",
  "📯",
  "📫",
  "📪",
  "📬",
  "📭",
  "📮",
  "📦",
  "📝",
  "📄",
  "📃",
  "📑",
  "📊",
  "📈",
  "📉",
  "📜",
  "📋",
  "📅",
  "📆",
  "📇",
  "📁",
  "📂",
  "✂",
  "📌",
  "📎",
  "✒",
  "✏",
  "📏",
  "📐",
  "📕",
  "📗",
  "📘",
  "📙",
  "📓",
  "📔",
  "📒",
  "📚",
  "📖",
  "🔖",
  "📛",
  "🔬",
  "🔭",
  "📰",
  "🎨",
  "🎬",
  "🎤",
  "🎧",
  "🎼",
  "🎵",
  "🎶",
  "🎹",
  "🎻",
  "🎺",
  "🎷",
  "🎸",
  "👾",
  "🎮",
  "🃏",
  "🎴",
  "🀄",
  "🎲",
  "🎯",
  "🏈",
  "🏀",
  "⚽",
  "⚾",
  "🎾",
  "🎱",
  "🏉",
  "🎳",
  "⛳",
  "🚵",
  "🚴",
  "🏁",
  "🏇",
  "🏆",
  "🎿",
  "🏂",
  "🏊",
  "🏄",
  "🎣",
  "☕",
  "🍵",
  "🍶",
  "🍼",
  "🍺",
  "🍻",
  "🍸",
  "🍹",
  "🍷",
  "🍴",
  "🍕",
  "🍔",
  "🍟",
  "🍗",
  "🍖",
  "🍝",
  "🍛",
  "🍤",
  "🍱",
  "🍣",
  "🍥",
  "🍙",
  "🍘",
  "🍚",
  "🍜",
  "🍲",
  "🍢",
  "🍡",
  "🍳",
  "🍞",
  "🍩",
  "🍮",
  "🍦",
  "🍨",
  "🍧",
  "🎂",
  "🍰",
  "🍪",
  "🍫",
  "🍬",
  "🍭",
  "🍯",
  "🍎",
  "🍏",
  "🍊",
  "🍋",
  "🍒",
  "🍇",
  "🍉",
  "🍓",
  "🍑",
  "🍈",
  "🍌",
  "🍐",
  "🍍",
  "🍠",
  "🍆",
  "🍅",
  "🌽",
  "🏠",
  "🏡",
  "🏫",
  "🏢",
  "🏣",
  "🏥",
  "🏦",
  "🏪",
  "🏩",
  "🏨",
  "💒",
  "⛪",
  "🏬",
  "🏤",
  "🌇",
  "🌆",
  "🏯",
  "🏰",
  "⛺",
  "🏭",
  "🗼",
  "🗾",
  "🗻",
  "🌄",
  "🌅",
  "🌃",
  "🗽",
  "🌉",
  "🎠",
  "🎡",
  "⛲",
  "🎢",
  "🚢",
  "⛵",
  "🚤",
  "🚣",
  "⚓",
  "🚀",
  "✈",
  "💺",
  "🚁",
  "🚂",
  "🚊",
  "🚉",
  "🚞",
  "🚆",
  "🚄",
  "🚅",
  "🚈",
  "🚇",
  "🚝",
  "🚋",
  "🚃",
  "🚎",
  "🚌",
  "🚍",
  "🚙",
  "🚘",
  "🚗",
  "🚕",
  "🚖",
  "🚛",
  "🚚",
  "🚨",
  "🚓",
  "🚔",
  "🚒",
  "🚑",
  "🚐",
  "🚲",
  "🚡",
  "🚟",
  "🚠",
  "🚜",
  "💈",
  "🚏",
  "🎫",
  "🚦",
  "🚥",
  "⚠",
  "🚧",
  "🔰",
  "⛽",
  "🏮",
  "🎰",
  "♨",
  "🗿",
  "🎪",
  "🎭",
  "📍",
  "🚩",
  "⬆",
  "⬇",
  "⬅",
  "➡",
  "🔠",
  "🔡",
  "🔤",
  "↗",
  "↖",
  "↘",
  "↙",
  "↔",
  "↕",
  "🔄",
  "◀",
  "▶",
  "🔼",
  "🔽",
  "↩",
  "↪",
  "ℹ",
  "⏪",
  "⏩",
  "⏫",
  "⏬",
  "⤵",
  "⤴",
  "🆗",
  "🔀",
  "🔁",
  "🔂",
  "🆕",
  "🆙",
  "🆒",
  "🆓",
  "🆖",
  "📶",
  "🎦",
  "🈁",
  "🈯",
  "🈳",
  "🈵",
  "🈴",
  "🈲",
  "🉐",
  "🈹",
  "🈺",
  "🈶",
  "🈚",
  "🚻",
  "🚹",
  "🚺",
  "🚼",
  "🚾",
  "🚰",
  "🚮",
  "🅿",
  "♿",
  "🚭",
  "🈷",
  "🈸",
  "🈂",
  "Ⓜ",
  "🛂",
  "🛄",
  "🛅",
  "🛃",
  "🉑",
  "㊙",
  "㊗",
  "🆑",
  "🆘",
  "🆔",
  "🚫",
  "🔞",
  "📵",
  "🚯",
  "🚱",
  "🚳",
  "🚷",
  "🚸",
  "⛔",
  "✳",
  "❇",
  "❎",
  "✅",
  "✴",
  "💟",
  "🆚",
  "📳",
  "📴",
  "🅰",
  "🅱",
  "🆎",
  "🅾",
  "💠",
  "➿",
  "♻",
  "♈",
  "♉",
  "♊",
  "♋",
  "♌",
  "♍",
  "♎",
  "♏",
  "♐",
  "♑",
  "♒",
  "♓",
  "⛎",
  "🔯",
  "🏧",
  "💹",
  "💲",
  "💱",
  "©",
  "®",
  "™",
  "〽",
  "〰",
  "🔝",
  "🔚",
  "🔙",
  "🔛",
  "🔜",
  "❌",
  "⭕",
  "❗",
  "❓",
  "❕",
  "❔",
  "🔃",
  "🕛",
  "🕧",
  "🕐",
  "🕜",
  "🕑",
  "🕝",
  "🕒",
  "🕞",
  "🕓",
  "🕟",
  "🕔",
  "🕠",
  "🕕",
  "🕖",
  "🕗",
  "🕘",
  "🕙",
  "🕚",
  "🕡",
  "🕢",
  "🕣",
  "🕤",
  "🕥",
  "🕦",
  "✖",
  "➕",
  "➖",
  "➗",
  "♠",
  "♥",
  "♣",
  "♦",
  "💮",
  "💯",
  "✔",
  "☑",
  "🔘",
  "🔗",
  "➰",
  "🔱",
  "🔲",
  "🔳",
  "◼",
  "◻",
  "◾",
  "◽",
  "▪",
  "▫",
  "🔺",
  "⬜",
  "⬛",
  "⚫",
  "⚪",
  "🔴",
  "🔵",
  "🔻",
  "🔶",
  "🔷",
  "🔸",
  "🔹",
];
