import { Table } from "./App/Table.js";
import { DOMHelper } from "./Utility/DOMHelper.js";

class App {
	static init() {
		{
			const dashboard = new Table("activities", "assets/json/dashboard.json", "dashboard-table", true, "Activity");
			const gamesSummary = new Table(
				"gameStatisticsPerGame",
				"assets/json/statistic-games-summary.json",
				"games-summary-table",
				false,
				false,
				"gameStatisticsSum"
			);
			const jackpotsSilver = new Table(
				"jackpots/Silver/dashboardJackpots",
				"assets/json/dashboard.json",
				"jackpots-silver-table",
				false,
				false
			);
			const jackpotsGold = new Table(
				"jackpots/Gold/dashboardJackpots",
				"assets/json/dashboard.json",
				"jackpots-gold-table",
				false,
				false
			);
			const jackpotsPlatinum = new Table(
				"jackpots/Platinum/dashboardJackpots",
				"assets/json/dashboard.json",
				"jackpots-platinum-table",
				false,
				false
			);
			const jackpotsDiamond = new Table(
				"jackpots/Diamond/dashboardJackpots",
				"assets/json/dashboard.json",
				"jackpots-diamond-table",
				false,
				false
			);
			const portalEur = new Table(
				"portalsActivities/Portal-EUR/activities",
				"assets/json/dashboard.json",
				"dashboard-portal-eur-table",
				true,
				"Activity"
			);
			const portalUsd = new Table(
				"portalsActivities/Portal-USD/activities",
				"assets/json/dashboard.json",
				"dashboard-portal-usd-table",
				true,
				"Activity"
			);
			const portalRsd = new Table(
				"portalsActivities/Portal-RSD/activities",
				"assets/json/dashboard.json",
				"dashboard-portal-rsd-table",
				true,
				"Activity"
			);
			const slotAccounting = new Table(
				"slotAccounting",
				"assets/json/accounting-reports.json",
				"slot-accounting-table",
				false,
				false,
				"slotAccountingSum",
				"bonusRate"
			);
			const rouletteAccounting = new Table(
				"rouletteAccounting",
				"assets/json/accounting-reports.json",
				"roulette-accounting-table",
				false,
				false,
				"rouletteAccountingSum"
			);
			const lerAccounting = new Table(
				"liveEuropeanRouletteAccounting",
				"assets/json/accounting-reports.json",
				"ler-accounting-table",
				false,
				false,
				"liveEuropeanRouletteAccountingSum"
			);
			const tcrAccounting = new Table(
				"tripleCrownRouletteAccounting",
				"assets/json/accounting-reports.json",
				"tcr-accounting-table",
				false,
				false,
				"tripleCrownRouletteAccountingSum"
			);
			const pokerAccounting = new Table(
				"pokerAccounting",
				"assets/json/accounting-reports.json",
				"poker-accounting-table",
				false,
				false,
				"pokerAccountingSum"
			);
		}
	}
}

App.init();
DOMHelper.init();
