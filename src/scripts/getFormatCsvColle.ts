const listColle: {
  matiere: string;
  id: string;
  colleur: string;
  dateStart: Date;
  dateEnd: Date;
  salle: string;
}[] = [];

const str = `MPSI 2020/2021 – Second semestre;;;;;;1/2;22/2;1/3;8/3;15/3;22/3;29/3;6/4;26/4;10/5;3/5;17/5;25/5;31/5;7/6;14/6
Matière;Id;Colleur;Jour;Heure;Salle;S16;S17;S18;S19;S20;S21;S22;S23;S24.2;S24.1;S25;S26;S27;S28;S29;S30;
Maths;M1;M. Alasseur;lundi ;12h30-13h30;L304;10;11;12;13;;1;2;3;;4;5;6;7;8;9;10
Maths;M2;Mme. Anton;lundi;16h-17h;H207;1;2;3;4;5;6;7;8;;9;10;11;12;13;;1
Maths;M3;M. Billouet;lundi ;12h30-13h30;L302;;1;2;3;4;5;6;7;;8;9;10;11;12;13;
Maths;M4;M. Billouet;jeudi;12h50-13h50;L303;7;8;9;10;11;12;13;;1;;2;3;4;5;6;7
Maths;M5;M. Blanchard;lundi ;12h30-13h30;L301;12;13;;1;2;3;4;5;;6;7;8;9;10;11;12
Maths;M6;M. Boussion;mardi;18h-19h;H219;11;12;13;;1;2;3;4;;5;6;7;8;9;10;11
Maths;M7;M. Couturier;jeudi;18h-19h;L302;2;3;4;5;6;7;8;9;10;;11;12;13;;1;2
Maths;M8;M. Dubuc;jeudi;12h50-13h50;L302;9;10;11;12;13;;1;2;3;;4;5;6;7;8;9
Maths;M9;M. Jourdan;lundi ;12h30-13h30;L303;8;9;10;11;12;13;;1;;2;3;4;5;6;7;8
Maths;M10;M. Kamerling;lundi ;17h-18h;L304;13;;1;2;3;4;5;6;;;8;9;10;11;12;13
Maths;M11;M. Kamerling;lundi ;18h-19h;L304;6;7;8;9;10;11;12;13;;7;1;2;3;4;5;6
Maths;M12;M. Mascaro;lundi;16h-17h;L301;5;6;7;8;9;10;11;12;;13;;1;2;3;4;5
Maths;M13;M. Pech;vendredi;17h-18h;L301;4;5;6;7;8;9;10;11;12;;13;;1;2;3;4
Maths;M14;M. Poirot;jeudi;12h50-13h50;H205;3;4;5;6;7;8;9;10;11;;12;13;;1;2;3
Anglais;A1;Mme. Bargès;jeudi;12h50-13h50;H216;;1;2;3;4;5;6;7;8;;9;10;11;12;13;
Anglais;A2;Mme. Charif;jeudi;11h55-12h50;H219;4;5;6;7;8;9;10;11;12;;13;6;1;2;3;4
Anglais;A3;Mme. Charif;jeudi;12h50-13h50;H219;10;11;12;13;;1;2;3;4;;5;;7;8;9;10
Anglais;A4;Mme. Galby;lundi ;12h30-13h30;H104;2;3;4;5;6;7;8;9;;10;11;12;13;;1;2
Anglais;A5;Mme. Marin Cudraz;jeudi;18h-19h;H105;8;9;10;11;12;13;;1;2;;3;4;5;6;7;8
Anglais;A6;Mme. Paczka;jeudi;18h-19h;H216;12;13;;1;2;3;4;5;6;;7;8;9;10;11;12
Anglais;A7;Mme. Pineau;jeudi;12h-13h;H105;6;7;8;9;10;11;12;13;;;1;2;3;4;5;6
Phy-Ch;P1;M. Desnoël;mardi;18h-19h;L310;7;8;9;10;11;12;13;8;;1;2;3;4;5;6;7
Phy-Ch;P2;M. Desnoël;mercredi;11h-12h;L302;1;2;3;4;5;6;7;;;9;10;11;12;13;;1
Phy-Ch;P3;M. Légaut;lundi ;12h30-13h30;L305;9;10;11;12;13;;1;2;;3;4;5;6;7;8;9
Phy-Ch;P4;M. Peschoux;vendredi;18h-19h;L303;3;4;5;6;7;8;9;10;11;;12;13;;1;2;3
Phy-Ch;P5;M. Poincloux;jeudi;12h50-13h50;L310;11;12;13;8;1;2;3;4;5;;6;1;2;9;10;11
Phy-Ch;P6;M. Poincloux;vendredi;12h50-13h50;L305;5;6;7;;9;10;11;12;13;;;7;8;3;4;5
Phy-Ch;P7;Mme. Praly;jeudi;12h50-13h50;L301;13;;1;2;3;4;5;6;7;;8;9;10;11;12;13`;

const items: string[][] = str.split("\n").map((el) => el.split(";"));
const headers = [items[0], items[1]];

function calcAddDays(strDay: string) {
  switch (strDay) {
    case "mardi":
      return 1;
    case "mercredi":
      return 2;
    case "jeudi":
      return 3;
    case "vendredi":
      return 4;

    default:
      return 0;
  }
}

function getDateOfColle(idCol: number, idLigne: number) {
  const [day, month] = headers[0][idCol]
    .split("/")
    .map((el) => parseInt(el, 10));
  const [start, end] = items[idLigne][4].split("-").map((el) => {
    const d = el.split("h").map((l) => parseInt(l, 10) || 0);
    return { hour: d[0], min: d[1] };
  });

  const dateStart = new Date();
  dateStart.setUTCHours(0, 0, 0, 0);
  dateStart.setMonth(month - 1);
  dateStart.setDate(day + calcAddDays(items[idLigne][3]));
  if (idCol === 10 && idLigne === 10)
    console.log(
      day,
      month,
      day + calcAddDays(items[idLigne][3]),
      dateStart,
      dateStart.getTime(),
      dateStart.getUTCDate(),
      `${dateStart.getUTCFullYear()}-${dateStart.getUTCMonth()}-${dateStart.getUTCDay()} ${dateStart.getUTCHours()}:${dateStart.getUTCMinutes()}:0`
    );
  const dateEnd = new Date(dateStart);
  dateStart.setHours(start.hour, start.min);
  dateEnd.setHours(end.hour, end.min);
  return { dateStart, dateEnd };
}

function convertDateToStr(date: Date) {
  return `${date.getUTCFullYear()}-${date.getUTCMonth() +
    1}-${date.getUTCDate()} ${date.getUTCHours()}:${date.getUTCMinutes()}:0`;
}

export function getCsvFormat(idGroup: number) {
  const idGroupStr = idGroup + "";
  for (let idLigne = 2; idLigne < items.length; idLigne++) {
    const ligne = items[idLigne];
    for (let idCol = 6; idCol < ligne.length; idCol++) {
      if (ligne[idCol] !== idGroupStr) continue;
      listColle.push({
        matiere: ligne[0],
        id: `${ligne[1]} - ${headers[1][idCol]}`,
        colleur: ligne[2],
        salle: ligne[5],
        ...getDateOfColle(idCol, idLigne),
      });
    }
  }
  const newCsv: string = listColle
    .map((colle) =>
      [
        colle.id,
        colle.matiere,
        colle.colleur,
        colle.salle,
        convertDateToStr(colle.dateStart),
        convertDateToStr(colle.dateEnd),
      ].join(";")
    )
    .join("\n");
  return newCsv;
}
