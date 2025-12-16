// src/data/timelineData.ts
export type TimelineItemType = {
    id: string;
    dateLabel: string;
    title: string;
    description: string;
    tag?: string;
    accent?: "rose" | "peach" | "cream";
};

export const timelineData: TimelineItemType[] = [
    {
        id: "1",
        dateLabel: "İlk An",
        title: "Zaman Seninle Başladı",
        description:
            "Bu sayaç saniyeleri değil sana olan sevgimi sayıyor. Tanıştığımız andan itibaren geçen her an, kalbimde daha fazla yer ettin. Zaman ilerledikçe sevgim azalmadı, aksine her saniye seni biraz daha sevdim.",
        tag: "sonsuz",
        accent: "rose",
    },
    {
        id: "2",
        dateLabel: "İlk Yürüyüşümüz",
        title: "Koparıp Verdiğin O Çiçekk",
        description:
            "O gün seninle yan yana yürürken doğru kişi oldugunu anladıgım an. Yolun kenarından koparıp bana verdiğin o çiçek aslında kalbini uzattığın andı. Küçük bir an gibi görünse de benim için her şeyin daha da gerçek olduğu gündü.",
        tag: "ilkler",
        accent: "peach",
    },
    {
        id: "3",
        dateLabel: "Evimiz",
        title: "Makarna Günü",
        description:
            "Evde birlikte olduğumuz bi gündü. Bana makarna yapmıştın, çok basit bir şeydi ama o an kendimi gerçekten evimde hissettim. Abartısız en iyi makarna :))",
        tag: "biz",
        accent: "cream",
    },
    {
        id: "4",
        dateLabel: "Biz",
        title: "Anlatamadıklarım",
        description:
            "Buraya yazamadığım bir sürü şey var. Aldığın hediyeler, birlikte oynadığımız oyunlar, bazen sadece yan yana oturup hiçbir şey yapmamamız… En çok da bana hissettirdiğin sevgi. Hepsi burada, ama kelimelere sığmıyor.",
        tag: "her şey",
        accent: "rose",
    }, {
        id: "5",
        dateLabel: "Geleceğe",
        title: "Bir Not",
        description:
            "Bunu okuduğumuzda nerede oluruz bilmiyorum. Belki her şey çok değişmiştir, belki de hâlâ aynıyız. Ama şunu biliyorum: sen hayatıma iyi geldin. Gelecek ne getirirse getirsin, seni sevmekten vazgeçmeyeceğim.<3",
        tag: "gelecek",
        accent: "peach",
    }




];

