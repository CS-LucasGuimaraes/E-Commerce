"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchOrderHistory = void 0;
const supabase_1 = __importDefault(require("../../../supabase/supabase"));
const orderHistory_schema_1 = require("../schema/orderHistory-schema");
// Função para buscar o histórico de pedidos
const fetchOrderHistory = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data, error } = yield supabase_1.default
            .from("order-history")
            .select("*");
        if (error) {
            throw new Error(`Erro ao buscar histórico de pedidos: ${error.message}`);
        }
        // Valida os dados usando o esquema
        const validatedData = data.map((item) => orderHistory_schema_1.orderHistorySchema.parse(item));
        return validatedData;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
});
exports.fetchOrderHistory = fetchOrderHistory;
